import { useState } from "react";

export default function Invoice() {
  const [items] = useState([
    { id: 1, product: "Produit A", qty: 2, price: 15 },
    { id: 2, product: "Produit B", qty: 1, price: 25 },
  ]);

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div>
      <h1>🧾 Facturation</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Qté</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.product}</td>
              <td>{i.qty}</td>
              <td>{i.price} DT</td>
              <td>{i.qty * i.price} DT</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total : {total} DT</h2>
    </div>
  );
}
