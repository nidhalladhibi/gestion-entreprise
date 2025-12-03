import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

// Styles pour une apparence moderne
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '25px',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: '#333',
    margin: '0 0 20px 0',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 25px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
    padding: '5px 10px',
    fontSize: '0.8rem',
  },
  addItemSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
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
  totalContainer: {
    textAlign: 'right',
    marginTop: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }
};

export default function Invoice() {
  const { clients, products, loading, error } = useContext(DataContext) || {};

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  // Ajoute un produit à la liste des articles de la facture
  const addItem = () => {
    if (!selectedProduct || !products || quantity <= 0) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const newItem = {
      ...product,
      quantity: Number(quantity),
      total: product.price * Number(quantity),
    };

    setItems([...items, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  // Supprime un article de la facture
  const removeItem = (itemId) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  const totalInvoice = items.reduce((sum, item) => sum + item.total, 0);

  if (loading && (!clients || !products)) return <p>Chargement des données pour la facturation...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div style={styles.container}>
      <h1>🧾 Création de Facture</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Sélectionnez un client et ajoutez des produits pour générer une facture.</p>

      {/* Carte de sélection du client */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>1. Choisir un client</h2>
        <select
          style={styles.select}
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">-- Choisir un client --</option>
          {(clients || []).map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Carte d'ajout des produits */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>2. Ajouter des articles</h2>
        <div style={styles.addItemSection}>
          <select
            style={{ ...styles.select, flex: 3 }}
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">-- Sélectionnez un produit --</option>
            {(products || []).map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price.toFixed(2)} DT
              </option>
            ))}
          </select>

          <input
            style={{ ...styles.input, flex: 1 }}
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button onClick={addItem} style={{ ...styles.button, flex: 1 }} disabled={!selectedProduct || quantity <= 0}>
            ➕ Ajouter
          </button>
        </div>
      </div>

      {/* Carte récapitulative de la facture */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>3. Récapitulatif</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd}>Produit</th>
              <th style={styles.thTd}>Prix U.</th>
              <th style={styles.thTd}>Quantité</th>
              <th style={styles.thTd}>Total</th>
              <th style={styles.thTd}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td style={styles.thTd}>{item.name}</td>
                  <td style={styles.thTd}>{item.price.toFixed(2)} DT</td>
                  <td style={styles.thTd}>{item.quantity}</td>
                  <td style={styles.thTd}>{item.total.toFixed(2)} DT</td>
                  <td style={styles.thTd}>
                    <button onClick={() => removeItem(item._id)} style={{...styles.button, ...styles.buttonDanger}}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" align="center" style={styles.thTd}>
                  Aucun produit ajouté à la facture.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={styles.totalContainer}>
          Total : {totalInvoice.toFixed(2)} DT
        </div>
      </div>

      <button style={{ ...styles.button, width: '100%', fontSize: '1.2rem' }} disabled={items.length === 0 || !selectedClient}>
        ✅ Valider la Facture
      </button>
    </div>
  );
}
