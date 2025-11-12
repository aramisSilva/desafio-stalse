"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Ticket {
  id: number;
  customer_name: string;
  subject: string;
  body: string;
  status: string;
  priority: string;
  channel: string;
  created_at: string;
}

export default function TicketDetail() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const params = useParams(); // <-- novo hook
  const id = params.id ? Number(params.id) : null;

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return;
      try {
        const res = await fetch(`${API_URL}/tickets`);
        const data = await res.json();
        const found = data.find((t: Ticket) => t.id === id);
        setTicket(found || null);
      } catch (error) {
        console.error("Erro ao buscar ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const updateTicket = async (changes: Partial<Ticket>) => {
    if (!ticket) return;

    const res = await fetch(`${API_URL}/tickets/${ticket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });

    const data = await res.json();
    if (data.ok) {
      setTicket(data.ticket);
      alert("Ticket atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar ticket!");
    }
  };

  if (loading) return <p className="p-6">Carregando ticket...</p>;
  if (!ticket) return <p className="p-6">Ticket não encontrado.</p>;

  return (
    <main className="p-6 space-y-4">
      <button
        onClick={() => router.push("/tickets")}
        className="text-blue-600 underline"
      >
        ← Voltar para lista
      </button>

      <h1 className="text-2xl font-bold">Ticket #{ticket.id}</h1>

      <div className="space-y-2">
        <p><strong>Cliente:</strong> {ticket.customer_name}</p>
        <p><strong>Canal:</strong> {ticket.channel}</p>
        <p><strong>Assunto:</strong> {ticket.subject}</p>
        <p><strong>Mensagem:</strong> {ticket.body}</p>
        <p><strong>Criado em:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
      </div>

      <div className="space-y-2">
        <strong>Status atual:</strong> {ticket.status}
        <div className="flex gap-2 mt-2">
          {["open", "pending", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => updateTicket({ status: s })}
              className={`px-3 py-1 rounded ${
                ticket.status === s ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <strong>Prioridade:</strong> {ticket.priority}
        <div className="flex gap-2 mt-2">
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              onClick={() => updateTicket({ priority: p })}
              className={`px-3 py-1 rounded ${
                ticket.priority === p ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
