from repositories.ticket_repository import TicketRepository
import requests
import os

class TicketUseCase:
    def __init__(self, repo: TicketRepository):
        self.repo = repo
        self.webhook_url = os.getenv(
            "N8N_WEBHOOK_URL",
            "http://localhost:5678/webhook-test/ticket-update"
        )

    def list_tickets(self, q: str | None = None):
        return self.repo.get_all(q)

    def update_ticket(self, ticket_id: int, payload: dict):
        ticket = self.repo.get_by_id(ticket_id)
        if not ticket:
            return None

        for key, value in payload.items():
            setattr(ticket, key, value)

        updated = self.repo.update(ticket)
        if updated.status == "closed" or updated.priority == "high":
            try:
                requests.post(
                    self.webhook_url,
                    json={
                        "id": updated.id,
                        "status": updated.status,
                        "priority": updated.priority,
                    },
                    timeout=3
                )
                print(f"Webhook enviado com sucesso para {self.webhook_url}")
            except Exception as e:
                print(f"Falha ao enviar webhook: {e}")

        return updated
