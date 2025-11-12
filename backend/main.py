from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from db import get_session, init_db, engine
from repositories.ticket_repository import TicketRepository
from usecases.ticket_usecase import TicketUseCase
from models import Ticket
from typing import List, Optional, Dict, Any
import os, json

app = FastAPI(title="Mini Inbox API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

    seed_path = os.path.join(os.path.dirname(__file__), "seeds", "tickets.json")
    if os.path.exists(seed_path):
        with Session(engine) as session:
            count = session.exec(select(Ticket)).all()
            if not count:
                with open(seed_path, "r", encoding="utf-8") as f:
                    tickets = json.load(f)
                    for t in tickets:
                        session.add(Ticket(**t))
                    session.commit()
                    print(f"{len(tickets)} tickets inseridos.")
            else:
                print("Banco já contém tickets.")

@app.get("/tickets", response_model=List[Ticket])
def list_tickets(q: Optional[str] = None, session: Session = Depends(get_session)):
    uc = TicketUseCase(TicketRepository(session))
    return uc.list_tickets(q)

@app.patch("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, payload: Dict[str, Any], session: Session = Depends(get_session)):
    uc = TicketUseCase(TicketRepository(session))
    ticket = uc.update_ticket(ticket_id, payload)
    if not ticket:
        raise HTTPException(404, "Ticket não encontrado")
    return {"ok": True, "ticket": ticket}

@app.get("/metrics")
def get_metrics():
    metrics_path = os.getenv("METRICS_PATH", "http://localhost:8000/data/processed/metrics.json")

    if not os.path.exists(metrics_path):
        fallback_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "data", "processed", "metrics.json"))
        if os.path.exists(fallback_path):
            metrics_path = fallback_path

    if not os.path.exists(metrics_path):
        raise HTTPException(
            404,
            detail=f"Arquivo metrics.json não encontrado. Aqui: {metrics_path}"
        )

    with open(metrics_path, "r", encoding="utf-8") as f:
        return json.load(f)