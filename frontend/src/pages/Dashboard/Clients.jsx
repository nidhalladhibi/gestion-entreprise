import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Mail, 
  Phone, 
  DollarSign,
  UserPlus,
  AlertCircle
} from "react-feather";
import "../../styles/Clients.css";

const styles = {
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    alignItems: "end",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    transition: "all 0.2s",
    backgroundColor: "#f9fafb",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#3b82f6",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  },
  button: {
    padding: "12px 24px",
    fontSize: "0.9375rem",
    fontWeight: 500,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: "44px",
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  buttonPrimaryHover: {
    backgroundColor: "#2563eb",
    transform: "translateY(-1px)",
  },
  buttonDanger: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
  },
  buttonDangerHover: {
    backgroundColor: "#dc2626",
  },
  buttonSecondary: {
    backgroundColor: "#6b7280",
    color: "#ffffff",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "24px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 48px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    backgroundColor: "#f9fafb",
    transition: "all 0.2s",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    minWidth: "1000px",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "20px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "0.9375rem",
    color: "#1f2937",
    whiteSpace: "nowrap",
  },
  creditPositive: {
    color: "#059669",
    fontWeight: 500,
  },
  creditNeutral: {
    color: "#6b7280",
    fontWeight: 500,
  },
  creditNegative: {
    color: "#dc2626",
    fontWeight: 500,
  },
  emptyState: {
    padding: "64px 32px",
    textAlign: "center",
    color: "#6b7280",
  },
  emptyIcon: {
    margin: "0 auto 16px",
    color: "#d1d5db",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 32px",
    color: "#6b7280",
  },
  errorAlert: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#991b1b",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  statusActive: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
};

export default function Clients() {
  const { clients, addClient, deleteClient, loading, error } =
    useContext(DataContext) || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    credit: "",
  });

  const [search, setSearch] = useState("");
  const [hoverStates, setHoverStates] = useState({});

  const filteredClients = (clients || []).filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || "").includes(search)
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Veuillez remplir le nom et l'email.");
      return;
    }

    addClient({
      ...form,
      credit: Number(form.credit || 0),
    });

    setForm({ name: "", phone: "", email: "", address: "", credit: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      deleteClient(id);
    }
  };

  const getCreditStyle = (credit) => {
    if (credit > 0) return styles.creditPositive;
    if (credit < 0) return styles.creditNegative;
    return styles.creditNeutral;
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="spinner" style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e5e7eb",
          borderTopColor: "#3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "16px"
        }} />
        <p>Chargement des clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorAlert}>
          <AlertCircle size={20} />
          <div>
            <strong>Erreur de chargement</strong>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Users size={32} />
          Gestion des Clients
        </h1>
        <p style={styles.subtitle}>
          Gérez votre liste de clients, ajoutez de nouveaux contacts et suivez leurs crédits
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={styles.errorAlert}>
          <AlertCircle size={20} />
          <span>Erreur : {error}</span>
        </div>
      )}

      {/* Add Client Card */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <UserPlus size={20} />
          Ajouter un Nouveau Client
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Users size={14} />
              Nom du client
            </label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Mail size={14} />
              Email
            </label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="client@example.com"
              value={form.email}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Phone size={14} />
              Téléphone
            </label>
            <input
              style={styles.input}
              type="tel"
              name="phone"
              placeholder="+216 XX XXX XXX"
              value={form.phone}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <DollarSign size={14} />
              Crédit initial (DT)
            </label>
            <input
              style={styles.input}
              type="number"
              name="credit"
              placeholder="0.00"
              step="0.01"
              value={form.credit}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Adresse</label>
            <input
              style={styles.input}
              type="text"
              name="address"
              placeholder="Adresse complète"
              value={form.address}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={{...styles.label, opacity: 0}}>Action</label>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(hoverStates.addButton ? styles.buttonPrimaryHover : {})
              }}
              onMouseEnter={() => setHoverStates({...hoverStates, addButton: true})}
              onMouseLeave={() => setHoverStates({...hoverStates, addButton: false})}
            >
              <Plus size={16} />
              Ajouter le client
            </button>
          </div>
        </form>
      </div>

      {/* Clients List Card */}
      <div style={styles.section}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <h2 style={styles.sectionTitle}>
            <Users size={20} />
            Liste des Clients
            <span style={{
              backgroundColor: "#e5e7eb",
              color: "#374151",
              fontSize: "0.875rem",
              padding: "4px 12px",
              borderRadius: "9999px",
              marginLeft: "12px"
            }}>
              {filteredClients.length}
            </span>
          </h2>

          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style = {...styles.searchInput, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.tableContainer}>
          {filteredClients.length === 0 ? (
            <div style={styles.emptyState}>
              <Search size={48} style={styles.emptyIcon} />
              <h3 style={{ marginBottom: "8px", color: "#374151" }}>Aucun client trouvé</h3>
              <p style={{ margin: 0 }}>Aucun client ne correspond à votre recherche</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Client</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Crédit</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((c, i) => (
                  <tr
                    key={c._id}
                    style={{
                      transition: "background-color 0.2s",
                      backgroundColor: hoverStates[`row-${c._id}`] ? "#f9fafb" : "transparent"
                    }}
                    onMouseEnter={() => setHoverStates({...hoverStates, [`row-${c._id}`]: true})}
                    onMouseLeave={() => setHoverStates({...hoverStates, [`row-${c._id}`]: false})}
                  >
                    <td style={styles.td}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#374151"
                      }}>
                        {i + 1}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div style={{ fontWeight: 500, color: "#111827" }}>{c.name}</div>
                        {c.address && (
                          <div style={{
                            fontSize: "0.8125rem",
                            color: "#6b7280",
                            marginTop: "4px"
                          }}>
                            {c.address}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Mail size={12} color="#6b7280" />
                          <span>{c.email}</span>
                        </div>
                        {c.phone && (
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Phone size={12} color="#6b7280" />
                            <span>{c.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={getCreditStyle(c.credit || 0)}>
                        {(c.credit || 0).toFixed(2)} DT
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        ...styles.statusActive
                      }}>
                        Actif
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <Link
                          to={`/dashboard/client/edit/${c._id}`}
                          style={{
                            ...styles.button,
                            ...styles.buttonSecondary,
                            textDecoration: "none",
                            padding: "8px 16px",
                            fontSize: "0.875rem"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4b5563"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#6b7280"}
                        >
                          <Edit size={14} />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(c._id)}
                          style={{
                            ...styles.button,
                            ...styles.buttonDanger,
                            padding: "8px 16px",
                            fontSize: "0.875rem"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
                        >
                          <Trash2 size={14} />
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            div[style*="padding: 32px"] {
              padding: 20px;
            }
            
            div[style*="padding: 32px"][style*="borderRadius: 16px"] {
              padding: 20px;
            }
            
            .form-group {
              grid-column: span 2;
            }
          }
        `}
      </style>
    </div>
  );
}