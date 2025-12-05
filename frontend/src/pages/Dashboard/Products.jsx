import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

export default function Products() {
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
    actionButton: {
      marginRight: '10px',
      padding: '5px 10px',
      fontSize: '0.9rem',
      textDecoration: 'none',
      display: 'inline-block',
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

  const { products, addProduct, deleteProduct, loading, error } = useContext(DataContext) || {};

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Veuillez remplir les champs obligatoires");
      return;
    }

    if (typeof addProduct !== 'function') {
      console.error("La fonction addProduct n'est pas disponible via le contexte.");
      return;
    }

    addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0)
    });

    setForm({ name: "", price: "", stock: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(id);
    }
  };

  if (loading && !products) return <p>Chargement des produits...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div style={styles.container}>
      <h1>📦 Produits</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Ajoutez et gérez votre catalogue de produits.</p>

      {/* ✅ Formulaire ajout produit */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Ajouter un nouveau produit</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="price"
            placeholder="Prix (DT)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="stock"
            placeholder="Stock initial"
            value={form.stock}
            onChange={handleChange}
          />
          <button type="submit" style={styles.button}>➕ Ajouter</button>
        </form>
      </div>

      {/* ✅ Tableau produits */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Liste des produits</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd}>#</th>
              <th style={styles.thTd}>Produit</th>
              <th style={styles.thTd}>Prix</th>
              <th style={styles.thTd}>Quantité en Stock</th>
              <th style={styles.thTd}>Valeur Totale</th>
              <th style={styles.thTd}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).length === 0 ? (
              <tr>
                <td colSpan="6" align="center" style={styles.thTd}>
                  Aucun produit enregistré.
                </td>
              </tr>
            ) : (
              (products || []).map((p, i) => (
                <tr key={p._id}>
                  <td style={styles.thTd}>{i + 1}</td>
                  <td style={styles.thTd}>{p.name}</td>
                  <td style={styles.thTd}>{(p.price || 0).toFixed(2)} DT</td>
                  <td style={styles.thTd}>{p.stock || 0}</td>
                  <td style={styles.thTd}>{((p.price || 0) * (p.stock || 0)).toFixed(2)} DT</td>
                  <td style={styles.thTd}>
                    <Link to={`/dashboard/product/edit/${p._id}`} style={{...styles.button, ...styles.actionButton}}>Modifier</Link>
                    <button onClick={() => handleDelete(p._id)} style={{...styles.button, ...styles.actionButton, backgroundColor: '#dc3545'}}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
