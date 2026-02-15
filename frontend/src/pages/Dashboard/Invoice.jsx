import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FileText,
  User,
  Package,
  Plus,
  Trash2,
  Download,
  CheckCircle,
  Calendar,
  CreditCard,
  Hash,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  ChevronRight,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit3
} from "react-feather";

// Styles modernes avec design système cohérent
const styles = {
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
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
  wizardSteps: {
    display: "flex",
    gap: "8px",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  wizardStep: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  wizardStepActive: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  wizardStepInactive: {
    backgroundColor: "#e2e8f0",
    color: "#64748b",
  },
  wizardStepComplete: {
    backgroundColor: "#10b981",
    color: "#ffffff",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  },
  sectionHover: {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-2px)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  sectionSubtitle: {
    fontSize: "0.875rem",
    color: "#64748b",
    marginTop: "4px",
  },
  card: {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s",
  },
  cardSelected: {
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#475569",
  },
  requiredLabel: {
    color: "#ef4444",
    marginLeft: "2px",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    transition: "all 0.2s",
    cursor: "pointer",
  },
  selectFocus: {
    outline: "none",
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    transition: "all 0.2s",
  },
  inputFocus: {
    outline: "none",
    borderColor: "#3b82f6",
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
    minWidth: "120px",
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
  buttonSuccess: {
    backgroundColor: "#10b981",
    color: "#ffffff",
  },
  buttonSuccessHover: {
    backgroundColor: "#059669",
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
  buttonInfo: {
    backgroundColor: "#8b5cf6",
    color: "#ffffff",
  },
  buttonInfoHover: {
    backgroundColor: "#7c3aed",
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e1",
    color: "#94a3b8",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    border: "2px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  productCardSelected: {
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)",
  },
  productName: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "8px",
  },
  productPrice: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#3b82f6",
    marginBottom: "4px",
  },
  productStock: {
    fontSize: "0.8125rem",
    color: "#64748b",
  },
  stockBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    marginLeft: "8px",
  },
  stockHigh: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  stockLow: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  invoicePreview: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e2e8f0",
  },
  invoiceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "2px solid #e2e8f0",
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "8px",
  },
  companyDetails: {
    fontSize: "0.875rem",
    color: "#64748b",
    lineHeight: 1.6,
  },
  companyDetailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  invoiceMeta: {
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#3b82f6",
    marginBottom: "16px",
  },
  invoiceNumber: {
    fontSize: "1rem",
    color: "#64748b",
    marginBottom: "8px",
  },
  clientInfo: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "32px",
  },
  clientName: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    marginBottom: "32px",
  },
  tableHeader: {
    backgroundColor: "#f1f5f9",
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
  totalSection: {
    textAlign: "right",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "2px solid #e2e8f0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    fontSize: "1rem",
    color: "#64748b",
  },
  totalAmount: {
    fontSize: "1.875rem",
    fontWeight: 700,
    color: "#1e293b",
  },
  actionButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 32px",
    color: "#64748b",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "16px",
  },
  quantityButton: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  quantityButtonHover: {
    backgroundColor: "#f1f5f9",
    borderColor: "#94a3b8",
  },
  quantityInput: {
    width: "60px",
    textAlign: "center",
    padding: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  companySettings: {
    backgroundColor: "#f0f9ff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
    border: "1px solid #bae6fd",
  },
  companySettingsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    cursor: "pointer",
  },
  companySettingsTitle: {
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "#0369a1",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  companySettingsContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },
  companySettingsInput: {
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "0.875rem",
  },
  invoiceFooter: {
    marginTop: "48px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "0.875rem",
    textAlign: "center",
  },
};

export default function Invoice() {
  const { clients, products, loading, error } = useContext(DataContext) || {};

  // État pour les informations de l'entreprise
  const [companyInfo, setCompanyInfo] = useState({
    name: "Votre Entreprise",
    address: "123 Rue de Commerce",
    city: "1000 Tunis",
    country: "Tunisie",
    phone: "+216 12 345 678",
    email: "contact@entreprise.tn",
    website: "www.entreprise.tn",
    taxId: "TN123456789",
    regNumber: "B123456789",
    bankInfo: "IBAN: TN59 1000 1234 5678 9012 3456",
    logo: null,
  });

  const [showCompanySettings, setShowCompanySettings] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [tempCompanyInfo, setTempCompanyInfo] = useState({...companyInfo});

  const invoiceRef = useRef(null);

  // Générer un numéro de facture unique
  useEffect(() => {
    if (!selectedClient && items.length === 0) {
      setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
    }
  }, [selectedClient, items.length]);

  // Charger les informations de l'entreprise depuis le localStorage au démarrage
  useEffect(() => {
    const savedCompanyInfo = localStorage.getItem('companyInfo');
    if (savedCompanyInfo) {
      try {
        const parsed = JSON.parse(savedCompanyInfo);
        setCompanyInfo(parsed);
        setTempCompanyInfo(parsed);
      } catch (e) {
        console.error('Erreur de chargement des informations entreprise:', e);
      }
    }
  }, []);

  const saveCompanyInfo = () => {
    setCompanyInfo(tempCompanyInfo);
    localStorage.setItem('companyInfo', JSON.stringify(tempCompanyInfo));
    setShowCompanySettings(false);
  };

  const addItem = () => {
    if (!selectedProduct || !products || quantity <= 0) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const existingItemIndex = items.findIndex(item => item._id === product._id);

    if (existingItemIndex > -1) {
      const updatedItems = [...items];
      const newQuantity = updatedItems[existingItemIndex].quantity + Number(quantity);
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
        total: updatedItems[existingItemIndex].price * newQuantity,
      };
      setItems(updatedItems);
    } else {
      const newItem = {
        ...product,
        quantity: Number(quantity),
        total: product.price * Number(quantity),
      };
      setItems([...items, newItem]);
    }
    
    setSelectedProduct("");
    setQuantity(1);
    setActiveStep(3); // Passer à l'aperçu
  };

  const removeItem = (itemId) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item._id === itemId 
        ? { 
            ...item, 
            quantity: newQuantity,
            total: item.price * newQuantity
          }
        : item
    ));
  };

  const totalInvoice = items.reduce((sum, item) => sum + item.total, 0);
  const totalTVA = totalInvoice * 0.19; // TVA 19%
  const totalTTC = totalInvoice * 1.19;
  const clientDetails = clients ? clients.find(c => c._id === selectedClient) : null;

  const handleExportPDF = () => {
    const input = invoiceRef.current;
    if (!input) return;

    // Sauvegarder les styles originaux
    const originalStyles = {};
    const elementsToHide = input.querySelectorAll('.pdf-hide');
    elementsToHide.forEach(el => {
      originalStyles[el] = el.style.display;
      el.style.display = 'none';
    });

    html2canvas(input, { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
    })
      .then((canvas) => {
        try {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 20;

          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save(`facture-${invoiceNumber}.pdf`);
          
          // Restaurer les styles originaux
          elementsToHide.forEach(el => {
            el.style.display = originalStyles[el];
          });
          
          alert('Facture exportée avec succès !');
        } catch (error) {
          console.error('Erreur lors de la génération du PDF:', error);
          alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
        }
      })
      .catch((error) => {
        console.error('Erreur html2canvas:', error);
        alert('Erreur lors de la capture de la facture.');
      });
  };

  const handleValidate = () => {
    if (items.length === 0 || !selectedClient) return;

    // Simulation de validation
    const confirmValidation = window.confirm(
      `Valider cette facture de ${totalTTC.toFixed(2)} DT pour ${clientDetails?.name} ?`
    );

    if (confirmValidation) {
      alert("Facture validée avec succès ! Un email de confirmation a été envoyé au client.");
      
      // Réinitialisation
      setItems([]);
      setSelectedClient("");
      setSelectedProduct("");
      setQuantity(1);
      setActiveStep(1);
      setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px",
          color: "#64748b",
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            border: "4px solid #e2e8f0",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px"
          }} />
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#991b1b",
        }}>
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
          <FileText size={32} />
          Création de Facture
        </h1>
        <p style={styles.subtitle}>
          Créez et gérez vos factures en quelques clics. Exportez en PDF ou validez directement.
        </p>
      </div>

      {/* Bouton de paramètres entreprise */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setShowCompanySettings(!showCompanySettings)}
          style={{
            ...styles.button,
            ...styles.buttonInfo,
            ...(hoverStates.companySettings ? styles.buttonInfoHover : {}),
            padding: "10px 20px",
            fontSize: "0.875rem",
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, companySettings: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, companySettings: false})}
        >
          <Briefcase size={16} />
          {showCompanySettings ? "Masquer" : "Configurer"} les informations entreprise
        </button>
      </div>

      {/* Paramètres entreprise */}
      {showCompanySettings && (
        <div style={styles.companySettings}>
          <div style={styles.companySettingsHeader}>
            <div style={styles.companySettingsTitle}>
              <Edit3 size={16} />
              Informations de l'entreprise
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={saveCompanyInfo}
                style={{
                  ...styles.button,
                  ...styles.buttonSuccess,
                  padding: "6px 12px",
                  fontSize: "0.8125rem",
                }}
              >
                <CheckCircle size={12} />
                Sauvegarder
              </button>
            </div>
          </div>
          
          <div style={styles.companySettingsContent}>
            <div>
              <label style={styles.label}>Nom de l'entreprise *</label>
              <input
                type="text"
                value={tempCompanyInfo.name}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, name: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div>
              <label style={styles.label}>Adresse</label>
              <input
                type="text"
                value={tempCompanyInfo.address}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, address: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Adresse"
              />
            </div>
            <div>
              <label style={styles.label}>Ville / Code postal</label>
              <input
                type="text"
                value={tempCompanyInfo.city}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, city: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Ville"
              />
            </div>
            <div>
              <label style={styles.label}>Pays</label>
              <input
                type="text"
                value={tempCompanyInfo.country}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, country: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Pays"
              />
            </div>
            <div>
              <label style={styles.label}>Téléphone</label>
              <input
                type="text"
                value={tempCompanyInfo.phone}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, phone: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Téléphone"
              />
            </div>
            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={tempCompanyInfo.email}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, email: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Email"
              />
            </div>
            <div>
              <label style={styles.label}>Site web</label>
              <input
                type="text"
                value={tempCompanyInfo.website}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, website: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="Site web"
              />
            </div>
            <div>
              <label style={styles.label}>N° TVA / Fiscal</label>
              <input
                type="text"
                value={tempCompanyInfo.taxId}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, taxId: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="N° TVA"
              />
            </div>
            <div>
              <label style={styles.label}>Registre de commerce</label>
              <input
                type="text"
                value={tempCompanyInfo.regNumber}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, regNumber: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="N° registre"
              />
            </div>
            <div>
              <label style={styles.label}>Informations bancaires</label>
              <input
                type="text"
                value={tempCompanyInfo.bankInfo}
                onChange={(e) => setTempCompanyInfo({...tempCompanyInfo, bankInfo: e.target.value})}
                style={styles.companySettingsInput}
                placeholder="IBAN / RIB"
              />
            </div>
          </div>
        </div>
      )}

      {/* Wizard Steps */}
      <div style={styles.wizardSteps}>
        <div style={{
          ...styles.wizardStep,
          ...(activeStep >= 1 ? styles.wizardStepActive : styles.wizardStepInactive)
        }}>
          <User size={16} />
          1. Client
        </div>
        <ChevronRight size={16} color="#94a3b8" />
        <div style={{
          ...styles.wizardStep,
          ...(activeStep >= 2 ? styles.wizardStepActive : styles.wizardStepInactive)
        }}>
          <Package size={16} />
          2. Produits
        </div>
        <ChevronRight size={16} color="#94a3b8" />
        <div style={{
          ...styles.wizardStep,
          ...(activeStep >= 3 ? styles.wizardStepActive : styles.wizardStepInactive)
        }}>
          <FileText size={16} />
          3. Aperçu
        </div>
      </div>

      {/* Étape 1: Sélection du client */}
      <div 
        style={{
          ...styles.section,
          ...(hoverStates.section1 ? styles.sectionHover : {})
        }}
        onMouseEnter={() => setHoverStates({...hoverStates, section1: true})}
        onMouseLeave={() => setHoverStates({...hoverStates, section1: false})}
      >
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              <User size={20} />
              Sélection du Client
            </h2>
            <p style={styles.sectionSubtitle}>
              Choisissez le client pour cette facture
            </p>
          </div>
          {selectedClient && (
            <div style={{
              ...styles.card,
              ...styles.cardSelected,
              padding: "12px 20px",
            }}>
              <div style={styles.clientName}>{clientDetails?.name}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                {clientDetails?.email}
              </div>
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Client <span style={styles.requiredLabel}>*</span>
          </label>
          <select
            style={{
              ...styles.select,
              ...(selectedClient ? { borderColor: "#3b82f6" } : {})
            }}
            value={selectedClient}
            onChange={(e) => {
              setSelectedClient(e.target.value);
              if (e.target.value) setActiveStep(2);
            }}
            onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
            onBlur={(e) => e.target.style = styles.select}
          >
            <option value="">-- Sélectionner un client --</option>
            {(clients || []).map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} • {client.email} • Crédit: {client.credit?.toFixed(2) || "0.00"} DT
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Étape 2: Sélection des produits */}
      {(activeStep >= 2 || selectedClient) && (
        <div 
          style={{
            ...styles.section,
            ...(hoverStates.section2 ? styles.sectionHover : {})
          }}
          onMouseEnter={() => setHoverStates({...hoverStates, section2: true})}
          onMouseLeave={() => setHoverStates({...hoverStates, section2: false})}
        >
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                <Package size={20} />
                Sélection des Produits
              </h2>
              <p style={styles.sectionSubtitle}>
                Ajoutez des produits à la facture
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                backgroundColor: "#f1f5f9",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#475569",
              }}>
                <ShoppingCart size={14} style={{ marginRight: "8px" }} />
                {items.length} {items.length === 1 ? 'produit' : 'produits'}
              </div>
            </div>
          </div>

          <div style={styles.productGrid}>
            {(products || []).map((product) => (
              <div
                key={product._id}
                style={{
                  ...styles.productCard,
                  ...(selectedProduct === product._id ? styles.productCardSelected : {}),
                  ...(hoverStates[`product-${product._id}`] ? {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  } : {})
                }}
                onClick={() => setSelectedProduct(product._id)}
                onMouseEnter={() => setHoverStates({...hoverStates, [`product-${product._id}`]: true})}
                onMouseLeave={() => setHoverStates({...hoverStates, [`product-${product._id}`]: false})}
              >
                <div style={styles.productName}>{product.name}</div>
                <div style={styles.productPrice}>
                  <DollarSign size={16} style={{ verticalAlign: "middle" }} />
                  {product.price.toFixed(2)} DT
                </div>
                <div style={styles.productStock}>
                  Stock: {product.stock}
                  <span style={{
                    ...styles.stockBadge,
                    ...(product.stock > 20 ? styles.stockHigh : styles.stockLow)
                  }}>
                    {product.stock > 20 ? "Disponible" : "Stock limité"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedProduct && (
            <div style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "16px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>
                    {products?.find(p => p._id === selectedProduct)?.name}
                  </div>
                  <div style={{ color: "#3b82f6", fontWeight: 600 }}>
                    {products?.find(p => p._id === selectedProduct)?.price.toFixed(2)} DT
                  </div>
                </div>
                
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      ...styles.quantityButton,
                      ...(hoverStates.decrease ? styles.quantityButtonHover : {})
                    }}
                    onMouseEnter={() => setHoverStates({...hoverStates, decrease: true})}
                    onMouseLeave={() => setHoverStates({...hoverStates, decrease: false})}
                  >
                    -
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max={products?.find(p => p._id === selectedProduct)?.stock || 99}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={styles.quantityInput}
                  />
                  
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      ...styles.quantityButton,
                      ...(hoverStates.increase ? styles.quantityButtonHover : {})
                    }}
                    onMouseEnter={() => setHoverStates({...hoverStates, increase: true})}
                    onMouseLeave={() => setHoverStates({...hoverStates, increase: false})}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={addItem}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(hoverStates.addItem ? styles.buttonPrimaryHover : {})
                  }}
                  onMouseEnter={() => setHoverStates({...hoverStates, addItem: true})}
                  onMouseLeave={() => setHoverStates({...hoverStates, addItem: false})}
                >
                  <Plus size={16} />
                  Ajouter ({quantity})
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Étape 3: Aperçu de la facture */}
      {items.length > 0 && (
        <div ref={invoiceRef} style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                <FileText size={20} />
                Aperçu de la Facture
              </h2>
              <p style={styles.sectionSubtitle}>
                Vérifiez les détails avant validation
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                backgroundColor: "#f1f5f9",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#475569",
              }}>
                <Hash size={14} style={{ marginRight: "8px" }} />
                {invoiceNumber}
              </div>
            </div>
          </div>

          <div style={styles.invoicePreview}>
            {/* En-tête de la facture avec informations entreprise */}
            <div style={styles.invoiceHeader}>
              <div style={styles.companyInfo}>
                <div style={styles.companyName}>{companyInfo.name}</div>
                <div style={styles.companyDetails}>
                  <div style={styles.companyDetailItem}>
                    <MapPin size={14} />
                    {companyInfo.address}, {companyInfo.city}, {companyInfo.country}
                  </div>
                  <div style={styles.companyDetailItem}>
                    <Phone size={14} />
                    {companyInfo.phone}
                  </div>
                  <div style={styles.companyDetailItem}>
                    <Mail size={14} />
                    {companyInfo.email}
                  </div>
                  <div style={styles.companyDetailItem}>
                    <Globe size={14} />
                    {companyInfo.website}
                  </div>
                  {companyInfo.taxId && (
                    <div style={styles.companyDetailItem}>
                      <Briefcase size={14} />
                      TVA: {companyInfo.taxId}
                    </div>
                  )}
                </div>
              </div>
              
              <div style={styles.invoiceMeta}>
                <div style={styles.invoiceTitle}>FACTURE</div>
                <div style={styles.invoiceNumber}>
                  <Hash size={14} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                  {invoiceNumber}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
                  <Calendar size={14} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                  {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Informations client */}
            {clientDetails && (
              <div style={styles.clientInfo}>
                <div style={styles.clientName}>
                  <User size={16} style={{ verticalAlign: "middle", marginRight: "8px" }} />
                  {clientDetails.name}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {clientDetails.email && (
                    <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      <Mail size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      {clientDetails.email}
                    </div>
                  )}
                  {clientDetails.phone && (
                    <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      <Phone size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      {clientDetails.phone}
                    </div>
                  )}
                  {clientDetails.address && (
                    <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      <MapPin size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      {clientDetails.address}
                    </div>
                  )}
                  {clientDetails.credit !== undefined && (
                    <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                      <CreditCard size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      Crédit: {clientDetails.credit.toFixed(2)} DT
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tableau des articles */}
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>Produit</th>
                  <th style={styles.th}>Prix Unitaire</th>
                  <th style={styles.th}>Quantité</th>
                  <th style={styles.th}>Total HT</th>
                  <th style={styles.th} className="pdf-hide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 500 }}>{item.name}</div>
                    </td>
                    <td style={styles.td}>{item.price.toFixed(2)} DT</td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          style={{
                            ...styles.quantityButton,
                            width: "28px",
                            height: "28px",
                          }}
                          className="pdf-hide"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          style={{
                            ...styles.quantityButton,
                            width: "28px",
                            height: "28px",
                          }}
                          className="pdf-hide"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={styles.td}>{item.total.toFixed(2)} DT</td>
                    <td style={styles.td} className="pdf-hide">
                      <button
                        onClick={() => removeItem(item._id)}
                        style={{
                          ...styles.button,
                          ...styles.buttonDanger,
                          padding: "6px 12px",
                          fontSize: "0.875rem"
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total avec TVA */}
            <div style={styles.totalSection}>
              <div style={styles.totalRow}>
                <span>Total HT:</span>
                <span>{totalInvoice.toFixed(2)} DT</span>
              </div>
              <div style={styles.totalRow}>
                <span>TVA (19%):</span>
                <span>{totalTVA.toFixed(2)} DT</span>
              </div>
              <div style={{ ...styles.totalRow, marginTop: "20px" }}>
                <span>Total TTC:</span>
                <span style={styles.totalAmount}>
                  {totalTTC.toFixed(2)} DT
                </span>
              </div>
            </div>

            {/* Pied de page avec informations entreprise */}
            <div style={styles.invoiceFooter}>
              <p>{companyInfo.bankInfo}</p>
              <p>Paiement attendu sous 30 jours • Merci pour votre confiance !</p>
              {companyInfo.regNumber && (
                <p style={{ fontSize: "0.75rem", marginTop: "8px" }}>
                  RC: {companyInfo.regNumber} • TVA: {companyInfo.taxId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {(items.length > 0 && selectedClient) && (
        <div style={styles.actionButtons}>
          <button
            onClick={handleExportPDF}
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
              ...(hoverStates.export ? { backgroundColor: "#475569" } : {}),
              flex: 1,
            }}
            onMouseEnter={() => setHoverStates({...hoverStates, export: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, export: false})}
          >
            <Download size={16} />
            Exporter PDF
          </button>
          
          <button
            onClick={handleValidate}
            style={{
              ...styles.button,
              ...styles.buttonSuccess,
              ...(hoverStates.validate ? styles.buttonSuccessHover : {}),
              flex: 2,
            }}
            onMouseEnter={() => setHoverStates({...hoverStates, validate: true})}
            onMouseLeave={() => setHoverStates({...hoverStates, validate: false})}
          >
            <CheckCircle size={16} />
            Valider la Facture
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @media print {
            .pdf-hide {
              display: none !important;
            }
          }
          
          @media (max-width: 768px) {
            div[style*="padding: 32px"] {
              padding: 20px;
            }
            
            .wizard-steps {
              flex-direction: column;
            }
            
            .action-buttons {
              flex-direction: column;
            }
            
            .product-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}