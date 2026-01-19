import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  FileText,
  PlusCircle,
  UserPlus,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Calendar,
  CreditCard,
  AlertCircle
} from "react-feather";


const styles = {
  container: {
    padding: "32px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "32px",
  },
  welcomeMessage: {
    fontSize: "0.875rem",
    color: "#64748b",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.5,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  statCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
  },
  statIconContainer: {
    width: "56px",
    height: "56px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  statContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#1e293b",
    margin: "0",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: 500,
    marginTop: "8px",
  },
  statChange: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: "9999px",
  },
  changePositive: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  changeNegative: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  quickActions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "140px",
  },
  actionCardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    borderColor: "#3b82f6",
  },
  actionIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  actionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "8px",
  },
  actionDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "32px",
    marginBottom: "40px",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e293b",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  viewAllLink: {
    fontSize: "0.875rem",
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
  },
  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "16px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "0.9375rem",
    color: "#334155",
  },
  clientName: {
    fontWeight: 500,
    color: "#1e293b",
  },
  clientEmail: {
    fontSize: "0.8125rem",
    color: "#64748b",
    marginTop: "4px",
  },
  creditPositive: {
    color: "#059669",
    fontWeight: 600,
  },
  creditNegative: {
    color: "#ef4444",
    fontWeight: 600,
  },
  productStock: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  stockHigh: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  stockMedium: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  stockLow: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
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
  insightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  insightCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e2e8f0",
  },
  insightTitle: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#475569",
    marginBottom: "8px",
  },
  insightValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1e293b",
  },
};

export default function Home() {
  const dataContext = useContext(DataContext);
  const { clients, products, loading } = dataContext || {};

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
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  // Calcul des statistiques
  const totalClients = (clients || []).length;
  const totalProducts = (products || []).length;
  const totalCredit = (clients || []).reduce((sum, client) => sum + (client.credit || 0), 0);
  const totalStockValue = (products || []).reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);
  
  // Calcul des insights
  const averageCredit = totalClients > 0 ? (totalCredit / totalClients) : 0;
  const lowStockProducts = (products || []).filter(p => (p.stock || 0) <= 10).length;
  const highValueProducts = (products || []).filter(p => (p.price || 0) * (p.stock || 0) > 1000).length;
  
  // Clients récents (5 derniers)
  const recentClients = [...(clients || [])]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);
  
  // Produits en faible stock
  const lowStockList = [...(products || [])]
    .filter(p => (p.stock || 0) <= 10)
    .slice(0, 5);

  // Tendances (simulées - dans un cas réel, on aurait des données historiques)
  const clientGrowth = 12.5; // %
  const revenueGrowth = 8.3; // %
  const stockGrowth = -2.1; // %
const getStockStatus = (stock) => {
  if (stock > 50) return styles.stockHigh;
  if (stock > 10) return styles.stockMedium;
  return styles.stockLow;
};

 

  const getStockText = (stock) => {
    if (stock > 50) return "Élevé";
    if (stock > 10) return "Modéré";
    return "Faible";
  };

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Bonjour";
    if (currentHour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.welcomeMessage}>
          <Calendar size={14} style={{ marginRight: "8px", verticalAlign: "middle" }} />
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <h1 style={styles.title}>
          {getGreeting()}, Bienvenue sur votre tableau de bord
        </h1>
        <p style={styles.subtitle}>
          Voici un aperçu de votre activité et de vos performances récentes
        </p>
      </div>

      {/* Statistiques principales */}
      <div style={styles.statsGrid}>
        {/* Clients */}
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{...styles.statIconContainer, backgroundColor: "rgba(59, 130, 246, 0.1)"}}>
            <Users size={28} color="#3b82f6" />
          </div>
          <div style={styles.statContent}>
            <div>
              <div style={styles.statValue}>{totalClients}</div>
              <div style={styles.statLabel}>Clients Totaux</div>
            </div>
            <div style={{
              ...styles.statChange,
              ...(clientGrowth >= 0 ? styles.changePositive : styles.changeNegative)
            }}>
              {clientGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(clientGrowth)}%
            </div>
          </div>
        </div>

        {/* Produits */}
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{...styles.statIconContainer, backgroundColor: "rgba(16, 185, 129, 0.1)"}}>
            <Package size={28} color="#10b981" />
          </div>
          <div style={styles.statContent}>
            <div>
              <div style={styles.statValue}>{totalProducts}</div>
              <div style={styles.statLabel}>Produits en Stock</div>
            </div>
            <div style={{
              ...styles.statChange,
              ...(stockGrowth >= 0 ? styles.changePositive : styles.changeNegative)
            }}>
              {stockGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(stockGrowth)}%
            </div>
          </div>
        </div>

        {/* Crédit Client */}
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{...styles.statIconContainer, backgroundColor: "rgba(139, 92, 246, 0.1)"}}>
            <CreditCard size={28} color="#33274eff" />
          </div>
          <div style={styles.statContent}>
            <div>
              <div style={styles.statValue}>{totalCredit.toFixed(0)} DT</div>
              <div style={styles.statLabel}>Crédit Client Total</div>
            </div>
            <div style={{
              ...styles.statChange,
              ...styles.changePositive
            }}>
              <ArrowUpRight size={14} />
              {revenueGrowth}%
            </div>
          </div>
        </div>

        {/* Valeur Stock */}
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{...styles.statIconContainer, backgroundColor: "rgba(245, 158, 11, 0.1)"}}>
            <DollarSign size={28} color="#f59e0b" />
          </div>
          <div style={styles.statContent}>
            <div>
              <div style={styles.statValue}>{totalStockValue.toFixed(0)} DT</div>
              <div style={styles.statLabel}>Valeur du Stock</div>
            </div>
            <div style={{
              ...styles.statChange,
              ...styles.changePositive
            }}>
              <TrendingUp size={14} />
              24.7%
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div style={styles.quickActions}>
        <Link
          to="/dashboard/clients"
          style={styles.actionCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={{...styles.actionIcon, backgroundColor: "rgba(59, 130, 246, 0.1)"}}>
            <UserPlus size={24} color="#3b82f6" />
          </div>
          <div style={styles.actionTitle}>Ajouter un Client</div>
          <p style={styles.actionDescription}>Enregistrez un nouveau client dans votre système</p>
        </Link>

        <Link
          to="/dashboard/products"
          style={styles.actionCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = "#10b981";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={{...styles.actionIcon, backgroundColor: "rgba(16, 185, 129, 0.1)"}}>
            <PlusCircle size={24} color="#10b981" />
          </div>
          <div style={styles.actionTitle}>Ajouter un Produit</div>
          <p style={styles.actionDescription}>Ajoutez un nouveau produit à votre catalogue</p>
        </Link>

        <Link
          to="/dashboard/invoice"
          style={styles.actionCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = "#8b5cf6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={{...styles.actionIcon, backgroundColor: "rgba(139, 92, 246, 0.1)"}}>
            <FileText size={24} color="#8b5cf6" />
          </div>
          <div style={styles.actionTitle}>Créer une Facture</div>
          <p style={styles.actionDescription}>Générez une nouvelle facture pour un client</p>
        </Link>

        <Link
          to="/dashboard/settings"
          style={styles.actionCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = "#64748b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={{...styles.actionIcon, backgroundColor: "rgba(100, 116, 139, 0.1)"}}>
            <Settings size={24} color="#64748b" />
          </div>
          <div style={styles.actionTitle}>Paramètres</div>
          <p style={styles.actionDescription}>Configurez votre application et vos préférences</p>
        </Link>
      </div>

      {/* Contenu principal */}
      <div style={styles.contentGrid}>
        {/* Clients récents */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <Users size={20} />
              Clients Récents
            </h2>
            <Link to="/dashboard/clients" style={styles.viewAllLink}>
              Voir tout
              <ArrowUpRight size={14} />
            </Link>
          </div>
          
          {recentClients.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>Client</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Crédit</th>
                </tr>
              </thead>
              <tbody>
                {recentClients.map((client) => (
                  <tr key={client._id}>
                    <td style={styles.td}>
                      <div style={styles.clientName}>{client.name}</div>
                      {client.phone && (
                        <div style={styles.clientEmail}>{client.phone}</div>
                      )}
                    </td>
                    <td style={styles.td}>{client.email}</td>
                    <td style={{
                      ...styles.td,
                      ...(client.credit >= 0 ? styles.creditPositive : styles.creditNegative)
                    }}>
                      {client.credit?.toFixed(2) || "0.00"} DT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.emptyState}>
              <Users size={48} color="#cbd5e1" />
              <h3 style={{ marginBottom: "8px", color: "#475569" }}>
                Aucun client trouvé
              </h3>
              <p style={{ margin: 0 }}>Commencez par ajouter votre premier client</p>
            </div>
          )}
        </div>

        {/* Produits en faible stock */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <AlertCircle size={20} />
              Stock à Réapprovisionner
            </h2>
            <Link to="/dashboard/products" style={styles.viewAllLink}>
              Gérer le stock
              <ArrowUpRight size={14} />
            </Link>
          </div>
          
          {lowStockList.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>Produit</th>
                  <th style={styles.th}>Prix</th>
                  <th style={styles.th}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockList.map((product) => (
                  <tr key={product._id}>
                    <td style={styles.td}>
                      <div style={styles.clientName}>{product.name}</div>
                    </td>
                    <td style={styles.td}>{product.price?.toFixed(2) || "0.00"} DT</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.productStock,
                        ...getStockStatus(product.stock || 0)
                      }}>
                        {product.stock || 0} unités ({getStockText(product.stock || 0)})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.emptyState}>
              <Package size={48} color="#cbd5e1" />
              <h3 style={{ marginBottom: "8px", color: "#475569" }}>
                Stock optimal
              </h3>
              <p style={{ margin: 0 }}>Tous vos produits sont bien approvisionnés</p>
            </div>
          )}

          {/* Insights rapides */}
          <div style={styles.insightsGrid}>
            <div style={styles.insightCard}>
              <div style={styles.insightTitle}>Moyenne Crédit Client</div>
              <div style={styles.insightValue}>{averageCredit.toFixed(2)} DT</div>
            </div>
            <div style={styles.insightCard}>
              <div style={styles.insightTitle}>Produits Stock Faible</div>
              <div style={styles.insightValue}>{lowStockProducts}</div>
            </div>
            <div style={styles.insightCard}>
              <div style={styles.insightTitle}>Produits Haute Valeur</div>
              <div style={styles.insightValue}>{highValueProducts}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activité récente (optionnel) */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <Activity size={20} />
            Aperçu des Performances
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#3b82f6" }}>
              {totalClients}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875rem" }}>Clients Actifs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#10b981" }}>
              {totalProducts}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875rem" }}>Produits en Catalogue</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#8b5cf6" }}>
              {totalCredit.toFixed(0)} DT
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875rem" }}>Volume Crédit</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#f59e0b" }}>
              {totalStockValue.toFixed(0)} DT
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875subtitle" }}>Valeur Inventaire</div>
          </div>
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
            
            .content-grid {
              grid-template-columns: 1fr;
            }
            
            .stats-grid {
              grid-template-columns: 1fr;
            }
            
            .quick-actions {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}