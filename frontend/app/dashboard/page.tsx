"use client";

import { useEffect, useState } from "react";

interface Metrics {
  total_tickets: number;
  tickets_by_day: Record<string, number>;
  tickets_by_topic?: Record<string, number>;
  tickets_by_priority?: Record<string, number>;
  tickets_by_channel?: Record<string, number>;
  tickets_by_status?: Record<string, number>;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${API_URL}/metrics`);
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Erro ao buscar métricas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <p className="p-6">Carregando métricas...</p>;
  if (!metrics) return <p className="p-6">Nenhuma métrica disponível.</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card title="All Tickets" value={metrics.total_tickets} />
        {metrics.tickets_by_status && (
          <Card
            title="Status"
            value={Object.entries(metrics.tickets_by_status)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          />
        )}
        {metrics.tickets_by_priority && (
          <Card
            title="Priorities"
            value={Object.entries(metrics.tickets_by_priority)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          />
        )}
        {metrics.tickets_by_channel && (
          <Card
            title="Channels"
            value={Object.entries(metrics.tickets_by_channel)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          />
        )}
      </div>
      <section>
        <h2 className="text-lg font-semibold mb-2">Tickets by day</h2>
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics.tickets_by_day).map(([day, count]) => (
              <tr key={day} className="border-t">
                <td className="p-2">{day}</td>
                <td className="p-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white border rounded shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
