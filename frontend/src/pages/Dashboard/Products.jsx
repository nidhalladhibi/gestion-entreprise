import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

export default function Products() {
  const { products, addProduct, loading, error } = useContext(DataContext) || {};

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

    addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      id: Date.now()
    });

    setForm({ name: "", price: "", stock: "" });
  };

  if (loading && !products) return <p>Chargement des produits...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

  return (
    <div>
      <h1>Produits</h1>

      {/* ✅ Formulaire ajout produit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* ✅ Tableau produits */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Produit</th>
            <th>Prix</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {(products || []).length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                Aucun produit enregistré
              </td>
            </tr>
          ) : (
            (products || []).map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.price} DT</td>
                <td>{p.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
