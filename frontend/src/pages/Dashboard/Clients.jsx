import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

export default function Clients() {
  const { clients, addClient, loading, error } = useContext(DataContext) || {};
  const [form, setForm] = useState({
    name: "",
    phone: "",
    credit: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (typeof addClient !== 'function') {
      console.error("La fonction addClient n'est pas disponible via le contexte.");
      return;
    }

    addClient({
      ...form,
      credit: Number(form.credit || 0),
      id: Date.now()
    });

    setForm({ name: "", phone: "", credit: "" });
  };

  if (loading && !clients) return <p>Chargement des clients...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div>
      <h1>Clients</h1>

      {/* ✅ Formulaire ajout client */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Nom du client"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="credit"
          placeholder="Crédit"
          value={form.credit}
          onChange={handleChange}
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* ✅ Tableau clients */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Crédit</th>
          </tr>
        </thead>
        <tbody>
          {(clients || []).length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                Aucun client enregistré
              </td>
            </tr>
          ) : (
            (clients || []).map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.credit} DT</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
