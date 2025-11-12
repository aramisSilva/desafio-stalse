from sqlmodel import SQLModel, create_engine, Session
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite')}"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    from models import Ticket
    SQLModel.metadata.create_all(engine)
    print("Banco inicializado com sucesso!")

def get_session():
    with Session(engine) as session:
        yield session
