import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

// Styles pour une apparence moderne, inspirés de Settings.jsx
const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '25px',
  },
  cardTitle: {
    fontSize: '1.4rem',
    margin: '0 0 20px 0',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  form: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    flex: '1',
    minWidth: '150px',
  },
  button: {
    padding: '12px 25px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  thTd: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default function Clients() {
  const { clients, addClient, loading, error } = useContext(DataContext) || {};
  const [form, setForm] = useState({
    name: "",
    phone: "",
    credit: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Veuillez remplir le nom et le téléphone.");
      return;
    }

    if (typeof addClient !== 'function') {
      console.error("La fonction addClient n'est pas disponible via le contexte.");
      return;
    }

    addClient({
      ...form,
      credit: Number(form.credit || 0)
    });

    setForm({ name: "", phone: "", credit: "" });
  };

  if (loading && !clients) return <p>Chargement des clients...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div style={styles.container}>
      <h1>👥 Clients</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Ajoutez et gérez la liste de vos clients.</p>

      {/* ✅ Formulaire ajout client */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Ajouter un nouveau client</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Nom du client"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="credit"
            placeholder="Crédit initial (DT)"
            value={form.credit}
            onChange={handleChange}
          />
          <button type="submit" style={styles.button}>➕ Ajouter</button>
        </form>
      </div>

      {/* ✅ Tableau clients */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Liste des clients</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd}>#</th>
              <th style={styles.thTd}>Nom</th>
              <th style={styles.thTd}>Téléphone</th>
              <th style={styles.thTd}>Crédit</th>
            </tr>
          </thead>
          <tbody>
            {(clients || []).length === 0 ? (
              <tr>
                <td colSpan="4" align="center" style={styles.thTd}>
                  Aucun client enregistré.
                </td>
              </tr>
            ) : (
              (clients || []).map((c, i) => (
                <tr key={c._id}>
                  <td style={styles.thTd}>{i + 1}</td>
                  <td style={styles.thTd}>{c.name}</td>
                  <td style={styles.thTd}>{c.phone}</td>
                  <td style={styles.thTd}>{(c.credit || 0).toFixed(2)} DT</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
