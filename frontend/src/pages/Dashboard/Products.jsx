import { useState } from "react";

export default function Products() {
  const [products] = useState([
    { id: 1, name: "Produit A", stock: 20, price: 15 },
    { id: 2, name: "Produit B", stock: 12, price: 25 },
  ]);

  return (
    <div>
      <h1>📦 Gestion des Produits</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Stock</th>
            <th>Prix</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.price} DT</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
