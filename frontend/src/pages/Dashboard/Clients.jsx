import { useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "Client 1", phone: "12345678", credit: 0 },
    { id: 2, name: "Client 2", phone: "99887766", credit: 50 },
  ]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: null, name: "", phone: "", credit: "" });
  const [isEditing, setIsEditing] = useState(false);

  // 🔍 Search filter
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✍ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add Client
  const addClient = () => {
    if (!form.name || !form.phone) {
      window.alert("Veuillez remplir tous les champs !");
      return;
    }
    const newClient = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      credit: Number(form.credit) || 0,
    };
    setClients([...clients, newClient]);
    setForm({ id: null, name: "", phone: "", credit: "" });
  };

  // ✏️ Edit client
  const editClient = (client) => {
    setIsEditing(true);
    setForm(client);
  };

  // 💾 Save edited client
  const saveEdit = () => {
    setClients(
      clients.map((c) => (c.id === form.id ? form : c))
    );
    setIsEditing(false);
    setForm({ id: null, name: "", phone: "", credit: "" });
  };

  // ❌ Delete client
  const deleteClient = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) return;
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1>👥 Gestion des Clients</h1>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher un client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />

      {/* Formulaire */}
      <div style={{ marginTop: "15px", marginBottom: "20px" }}>
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

        {!isEditing ? (
          <button onClick={addClient}>➕ Ajouter</button>
        ) : (
          <button onClick={saveEdit}>💾 Sauvegarder</button>
        )}
      </div>

      {/* Liste des clients */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Crédit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredClients.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun client trouvé</td>
            </tr>
          ) : (
            filteredClients.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.credit} DT</td>
                <td>
                  <button onClick={() => editClient(c)}>✏️ Modifier</button>
                  <button onClick={() => deleteClient(c.id)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
