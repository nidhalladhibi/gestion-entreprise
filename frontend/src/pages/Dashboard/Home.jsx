import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

// Styles pour les cartes et la mise en page
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "1rem",
    color: "#555",
    margin: "0 0 10px 0",
  },
  cardValue: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },
  quickAccess: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },
  quickAccessButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    textAlign: "center",
  },
  recentClientsTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thTd: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

export default function Home() {
  // On récupère les données depuis le contexte
  const dataContext = useContext(DataContext);

  const { clients, products, loading } = dataContext || {};

  if (loading) {
    return <p>Chargement du tableau de bord...</p>;
  }

  // Calcul des statistiques
  const totalClients = (clients || []).length;
  const totalProducts = (products || []).length;
  const totalCredit = (clients || []).reduce((sum, client) => sum + (client.credit || 0), 0);
  const totalStockValue = (products || []).reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);
  // On prend les 5 clients les plus récents
  const recentClients = (clients || []).slice(0, 5);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Tableau de bord</h1>

      {/* Cartes de statistiques */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>👥 Clients Totaux</h3>
          <p style={styles.cardValue}>{totalClients}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📦 Produits Enregistrés</h3>
          <p style={styles.cardValue}>{totalProducts}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💰 Crédit Client Total</h3>
          <p style={styles.cardValue}>{totalCredit.toFixed(2)} DT</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📈 Valeur Totale du Stock</h3>
          <p style={styles.cardValue}>{totalStockValue.toFixed(2)} DT</p>
        </div>
      </div>

      {/* Accès rapide */}
<h2 style={{ fontSize: "1.2rem" }}>Accès Rapide</h2>

<div style={styles.quickAccess}>
  <Link to="/dashboard/clients" style={styles.quickAccessButton}>
    ➕ Ajouter un Client
  </Link>

  <Link to="/dashboard/products" style={styles.quickAccessButton}>
    ➕ Ajouter un Produit
  </Link>

  <Link to="/dashboard/invoice" style={styles.quickAccessButton}>
    🧾 Créer une Facture
  </Link>

  <Link to="/dashboard/settings" style={styles.quickAccessButton}>
    ⚙️ Paramètres
  </Link>
</div>

      {/* Clients récents */}
      <div style={styles.card}>
        <h3>Derniers clients ajoutés</h3>
        {recentClients && recentClients.length > 0 ? (
          <p>Voici les derniers clients que vous avez ajoutés.</p>
        ) : (
          <p>Aucun client récent. Ajoutez votre premier client !</p>
        )}
      </div>
    </div>
  );
}
