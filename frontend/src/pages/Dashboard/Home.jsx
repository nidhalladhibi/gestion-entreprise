import React from "react";

export default function Home() {
  const stats = [
    { id: 1, title: "Revenus du jour", value: "1,250 DT" },
    { id: 2, title: "Nouvelles factures", value: "12" },
    { id: 3, title: "Clients", value: "86" },
    { id: 4, title: "Produits en faible stock", value: "5" },
  ];

  const recent = [
    { id: 1, client: "Ali", total: "120 DT", date: "2025-11-10" },
    { id: 2, client: "Sana", total: "50 DT", date: "2025-11-12" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Tableau de bord</h1>

      <div className="grid">
        {stats.map((s) => (
          <div className="card" key={s.id}>
            <h3>{s.title}</h3>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="table">
        <h3 style={{ marginBottom: 12 }}>Dernières transactions</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.client}</td>
                <td>{r.total}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
