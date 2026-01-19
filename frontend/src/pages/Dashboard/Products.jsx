import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  DollarSign, 
  Box, 
  AlertCircle,
  TrendingUp,
  BarChart2
} from "react-feather";

const styles = {
  // Layout principal
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  
  // Header section
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.5,
  },
  
  // Statistiques
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  statCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  statValue: {
    fontSize: "1.875rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  
  // Sections principales
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
  },
  
  // Formulaire
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
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    transition: "all 0.2s",
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  },
  
  // Boutons
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
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
  },
  buttonDanger: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
  },
  buttonDangerHover: {
    backgroundColor: "#dc2626",
  },
  buttonSecondary: {
    backgroundColor: "#64748b",
    color: "#ffffff",
  },
  
  // Recherche
  searchContainer: {
    position: "relative",
    width: "300px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 48px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    backgroundColor: "#ffffff",
    transition: "all 0.2s",
  },
  
  // Tableau
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    minWidth: "1000px",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  tableHeader: {
    backgroundColor: "#f1f5f9",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "20px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "0.9375rem",
    color: "#334155",
    whiteSpace: "nowrap",
    transition: "background-color 0.2s",
  },
  
  // État du stock
  stockHigh: {
    color: "#059669",
    backgroundColor: "#d1fae5",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.8125rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  stockMedium: {
    color: "#d97706",
    backgroundColor: "#fef3c7",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.8125rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  stockLow: {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.8125rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  
  // Valeur du stock
  valueCell: {
    fontWeight: 600,
    color: "#1e293b",
  },
  
  // Actions
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  
  // États vides/erreurs
  emptyState: {
    padding: "64px 32px",
    textAlign: "center",
    color: "#64748b",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 32px",
    color: "#64748b",
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
};

export default function Products() {
  const { products, addProduct, deleteProduct, loading, error } =
    useContext(DataContext) || {};

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [search, setSearch] = useState("");
  const [hoverStates, setHoverStates] = useState({});

  const filteredProducts = (products || []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calcul des statistiques
  const totalProducts = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averagePrice = totalProducts > 0 
    ? filteredProducts.reduce((sum, p) => sum + p.price, 0) / totalProducts 
    : 0;
  const lowStockProducts = filteredProducts.filter(p => p.stock <= 10).length;

  const getStockStatus = (stock) => {
    if (stock > 50) return styles.stockHigh;
    if (stock > 10) return styles.stockMedium;
    return styles.stockLow;
  };

  const getStockIcon = (stock) => {
    if (stock > 50) return "✅";
    if (stock > 10) return "⚠️";
    return "🔴";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price) {
      alert("Veuillez remplir les champs obligatoires (Nom et Prix)");
      return;
    }

    addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0),
    });

    setForm({ name: "", price: "", stock: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
      deleteProduct(id);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "20px"
        }} />
        <p>Chargement des produits...</p>
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
          <Package size={32} />
          Gestion des Produits
        </h1>
        <p style={styles.subtitle}>
          Gérez votre catalogue de produits, suivez les stocks et analysez la valeur de votre inventaire
        </p>
      </div>

      {/* Statistiques */}
      <div style={styles.statsContainer}>
        <div 
          style={{
            ...styles.statCard,
            ...(hoverStates.total ? styles.statCardHover : {})
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, total: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, total: false})}
        >
          <div style={{...styles.statIcon, backgroundColor: "rgba(59, 130, 246, 0.1)"}}>
            <Package size={24} color="#3b82f6" />
          </div>
          <div style={styles.statValue}>{totalProducts}</div>
          <div style={styles.statLabel}>Produits Totaux</div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(hoverStates.value ? styles.statCardHover : {})
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, value: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, value: false})}
        >
          <div style={{...styles.statIcon, backgroundColor: "rgba(16, 185, 129, 0.1)"}}>
            <DollarSign size={24} color="#10b981" />
          </div>
          <div style={styles.statValue}>{totalValue.toFixed(2)} DT</div>
          <div style={styles.statLabel}>Valeur Totale</div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(hoverStates.average ? styles.statCardHover : {})
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, average: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, average: false})}
        >
          <div style={{...styles.statIcon, backgroundColor: "rgba(139, 92, 246, 0.1)"}}>
            <TrendingUp size={24} color="#8b5cf6" />
          </div>
          <div style={styles.statValue}>{averagePrice.toFixed(2)} DT</div>
          <div style={styles.statLabel}>Prix Moyen</div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(hoverStates.lowStock ? styles.statCardHover : {})
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, lowStock: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, lowStock: false})}
        >
          <div style={{...styles.statIcon, backgroundColor: "rgba(239, 68, 68, 0.1)"}}>
            <AlertCircle size={24} color="#ef4444" />
          </div>
          <div style={styles.statValue}>{lowStockProducts}</div>
          <div style={styles.statLabel}>Stock Faible</div>
        </div>
      </div>

      {/* Ajouter un produit */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <Plus size={20} />
          Ajouter un Nouveau Produit
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Package size={14} />
              Nom du produit *
            </label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Ex: Smartphone XYZ"
              value={form.name}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <DollarSign size={14} />
              Prix (DT) *
            </label>
            <input
              style={styles.input}
              type="number"
              name="price"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Box size={14} />
              Quantité en stock
            </label>
            <input
              style={styles.input}
              type="number"
              name="stock"
              placeholder="0"
              min="0"
              value={form.stock}
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
              Ajouter le produit
            </button>
          </div>
        </form>
      </div>

      {/* Liste des produits */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <Package size={20} />
            Catalogue des Produits
            <span style={{
              backgroundColor: "#e2e8f0",
              color: "#475569",
              fontSize: "0.875rem",
              padding: "4px 12px",
              borderRadius: "9999px",
              marginLeft: "12px"
            }}>
              {filteredProducts.length}
            </span>
          </h2>

          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style = {...styles.searchInput, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.tableContainer}>
          {filteredProducts.length === 0 ? (
            <div style={styles.emptyState}>
              <Package size={48} color="#cbd5e1" />
              <h3 style={{ marginBottom: "8px", color: "#475569" }}>
                Aucun produit trouvé
              </h3>
              <p style={{ margin: 0 }}>
                {search ? "Aucun produit ne correspond à votre recherche" : "Commencez par ajouter votre premier produit"}
              </p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Produit</th>
                  <th style={styles.th}>Prix Unitaire</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Valeur du Stock</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, i) => (
                  <tr
                    key={p._id}
                    style={{
                      transition: "background-color 0.2s",
                      backgroundColor: hoverStates[`row-${p._id}`] ? "#f8fafc" : "transparent"
                    }}
                    onMouseEnter={() => setHoverStates({...hoverStates, [`row-${p._id}`]: true})}
                    onMouseLeave={() => setHoverStates({...hoverStates, [`row-${p._id}`]: false})}
                  >
                    <td style={styles.td}>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#475569"
                      }}>
                        {i + 1}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>
                        {p.name}
                      </div>
                      {p.description && (
                        <div style={{
                          fontSize: "0.8125rem",
                          color: "#64748b",
                          marginTop: "4px"
                        }}>
                          {p.description}
                        </div>
                      )}
                    </td>
                    <td style={styles.td}>
                      <div style={{ 
                        fontWeight: 600, 
                        color: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <DollarSign size={14} />
                        {p.price.toFixed(2)} DT
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={getStockStatus(p.stock)}>
                        {getStockIcon(p.stock)} {p.stock} unités
                      </div>
                    </td>
                    <td style={{...styles.td, ...styles.valueCell}}>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "4px",
                        color: "#10b981"
                      }}>
                        <BarChart2 size={14} />
                        {(p.price * p.stock).toFixed(2)} DT
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <Link
                          to={`/dashboard/product/edit/${p._id}`}
                          style={{
                            ...styles.button,
                            ...styles.buttonSecondary,
                            textDecoration: "none",
                            padding: "8px 16px",
                            fontSize: "0.875rem"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#475569"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#64748b"}
                        >
                          <Edit size={14} />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
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
            
            .form-group {
              grid-column: span 2;
            }
            
            .search-container {
              width: 100%;
            }
            
            .section-header {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </div>
  );
}