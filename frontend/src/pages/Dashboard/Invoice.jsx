import React, { useContext, useState, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [invoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  const invoiceRef = useRef(null);
  // Ajoute un produit à la liste des articles de la facture
  const addItem = () => {
    if (!selectedProduct || !products || quantity <= 0) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const existingItemIndex = items.findIndex(item => item._id === product._id);

    if (existingItemIndex > -1) {
      // Le produit existe déjà, on met à jour la quantité
      const updatedItems = [...items];
      const newQuantity = updatedItems[existingItemIndex].quantity + Number(quantity);
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
        total: updatedItems[existingItemIndex].price * newQuantity,
      };
      setItems(updatedItems);
    } else {
      // Nouveau produit, on l'ajoute à la liste
      const newItem = {
        ...product,
        quantity: Number(quantity),
        total: product.price * Number(quantity),
      };
      setItems([...items, newItem]);
    }
    setSelectedProduct("");
    setQuantity(1);
  };

  // Supprime un article de la facture
  const removeItem = (itemId) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  const totalInvoice = items.reduce((sum, item) => sum + item.total, 0);
  
  const clientDetails = clients ? clients.find(c => c._id === selectedClient) : null;

  const handleExportPDF = () => {
    const input = invoiceRef.current;
    if (!input) return;

    // On cache les boutons d'action pour ne pas les inclure dans le PDF
    const actions = input.querySelectorAll('.action-col');
    actions.forEach(el => el.style.display = 'none');

    html2canvas(input, { scale: 2 }) // scale pour une meilleure résolution
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = pdfWidth / imgWidth;
        const pdfHeight = imgHeight * ratio;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`facture-${Date.now()}.pdf`);
        // On ré-affiche les boutons après la génération
        actions.forEach(el => el.style.display = '');
      });
  };
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
        <h2 style={styles.cardTitle}>3. Aperçu de la facture</h2>
        <div ref={invoiceRef} style={{padding: '20px', border: '1px solid #eee'}}>
            {/* En-tête de la facture */}
            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px'}}>
                <div>
                    <h2 style={{margin: 0, color: '#333'}}>VotreEntreprise</h2>
                    <p style={{margin: 0, color: '#666'}}>123 Rue de l'Exemple, 75000 Paris</p>
                </div>
                <div style={{textAlign: 'right'}}>
                    <h3 style={{margin: 0}}>Facture</h3>
                    <p style={{margin: 0}}><strong>N° :</strong> {invoiceNumber}</p>
                    <p style={{margin: 0}}><strong>Date :</strong> {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Informations du client */}
            {clientDetails && (
                <div style={{marginBottom: '30px'}}>
                    <h4 style={{margin: '0 0 10px 0'}}>Facturé à :</h4>
                    <p style={{margin: 0}}><strong>{clientDetails.name}</strong></p>
                    <p style={{margin: 0}}>{clientDetails.address || 'Adresse non spécifiée'}</p>
                    <p style={{margin: 0}}>{clientDetails.phone || 'Téléphone non spécifié'}</p>
                </div>
            )}

            {/* Tableau des articles */}
            <table style={styles.table}>
              <thead style={{backgroundColor: '#f9f9f9'}}>
                <tr>
                  <th style={styles.thTd}>Produit</th>
                  <th style={styles.thTd}>Prix U.</th>
                  <th style={styles.thTd}>Quantité</th>
                  <th style={styles.thTd} align="right">Total</th>
                  <th style={{...styles.thTd}} className="action-col"></th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item._id}>
                      <td style={styles.thTd}>{item.name}</td>
                      <td style={styles.thTd}>{item.price.toFixed(2)} DT</td>
                      <td style={styles.thTd}>{item.quantity}</td>
                      <td style={styles.thTd} align="right">{item.total.toFixed(2)} DT</td>
                      <td style={styles.thTd} className="action-col">
                        <button onClick={() => removeItem(item._id)} style={{...styles.button, ...styles.buttonDanger, padding: '2px 5px', fontSize: '0.7rem'}}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" align="center" style={{...styles.thTd, padding: '20px'}}>
                      Aucun produit ajouté.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Total */}
            <div style={{...styles.totalContainer, marginTop: '30px', fontSize: '1.6rem'}}>
              <strong>Total : {totalInvoice.toFixed(2)} DT</strong>
            </div>

            {/* Pied de page */}
            <div style={{marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', color: '#888', fontSize: '12px', textAlign: 'center'}}>
                <p>Merci pour votre confiance.</p>
                <p>Les paiements sont attendus sous 30 jours.</p>
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <button onClick={handleExportPDF} style={{ ...styles.button, backgroundColor: '#17a2b8', flex: 1 }} disabled={items.length === 0 || !selectedClient}>
          📄 Exporter en PDF
        </button>
        <button style={{ ...styles.button, flex: 2, fontSize: '1.2rem' }} disabled={items.length === 0 || !selectedClient}>
          ✅ Valider la Facture
        </button>
      </div>
    </div>
  );
}
