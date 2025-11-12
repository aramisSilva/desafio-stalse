from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    customer_name: str
    channel: str
    subject: str
    status: str
    priority: str
