"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Ticket {
  id: number;
  created_at: string;
  customer_name: string;
  channel: string;
  subject: string;
  status: string;
  priority: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const fetchTickets = async (q?: string) => {
    const url = q ? `${API_URL}/tickets?q=${q}` : `${API_URL}/tickets`;
    const res = await fetch(url);
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets(query);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por cliente ou assunto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-64"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </form>

      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Created at</th>
            <th className="p-2 text-left">Customer Name</th>
            <th className="p-2 text-left">Channel</th>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              onClick={() => router.push(`/tickets/${t.id}`)}
              className="border-t hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td className="p-2">{new Date(t.created_at).toLocaleDateString()}</td>
              <td className="p-2">{t.customer_name}</td>
              <td className="p-2">{t.channel}</td>
              <td className="p-2">{t.subject}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
