from sqlmodel import select
from models import Ticket

class TicketRepository:
    def __init__(self, session):
        self.session = session

    def get_all(self, q: str | None = None):
        stmt = select(Ticket)
        if q:
            like = f"%{q}%"
            stmt = stmt.where(
                (Ticket.subject.like(like)) |
                (Ticket.customer_name.like(like)) |
                (Ticket.status.like(like)) |
                (Ticket.priority.like(like))
            )
        return self.session.exec(stmt.order_by(Ticket.created_at.desc())).all()

    def get_by_id(self, ticket_id: int):
        return self.session.get(Ticket, ticket_id)

    def update(self, ticket: Ticket):
        self.session.add(ticket)
        self.session.commit()
        self.session.refresh(ticket)
        return ticket
