import pandas as pd
import os, json

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
RAW_PATH = os.path.join(BASE_DIR, "data", "raw", "technical_support_tickets.csv")
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "processed", "metrics.json")

def generate_metrics():
    df = pd.read_csv(RAW_PATH)

    if "Created time" not in df.columns:
        raise KeyError("Coluna não encontrada")

    df["Created time"] = pd.to_datetime(df["Created time"], errors="coerce")
    tickets_by_day = (
        df["Created time"]
        .dt.date.value_counts()
        .sort_index()
        .to_dict()
    )
    tickets_by_day = {str(k): v for k, v in tickets_by_day.items()}
    metrics = {
        "total_tickets": len(df),
        "tickets_by_day": tickets_by_day,
        "tickets_by_topic": df["Topic"].value_counts().to_dict() if "Topic" in df.columns else {},
        "tickets_by_priority": df["Priority"].value_counts().to_dict() if "Priority" in df.columns else {},
        "tickets_by_channel": df["Source"].value_counts().to_dict() if "Source" in df.columns else {},
        "tickets_by_status": df["Status"].value_counts().to_dict() if "Status" in df.columns else {},
    }

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=4, ensure_ascii=False)

    print(f"✅ Métricas salvas em {OUTPUT_PATH}")

if __name__ == "__main__":
    generate_metrics()
