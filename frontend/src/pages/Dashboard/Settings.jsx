import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Globe,
  Bell,
  Database,
  Shield,
  Save,
  Key,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Check,
  AlertCircle,
  ChevronRight,
  Sun,
  Moon,
  Sun as Brush,
  // Removed unused imports: Mail, Phone, CreditCard
} from "react-feather";

const styles = {
  container: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
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
  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gap: "32px",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    height: "fit-content",
  },
  sidebarTitle: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "16px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#64748b",
    textDecoration: "none",
  },
  menuItemActive: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  menuItemHover: {
    backgroundColor: "#f1f5f9",
    color: "#1e293b",
  },
  menuIcon: {
    marginRight: "12px",
    width: "20px",
    textAlign: "center",
  },
  settingsContent: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  section: {
    marginBottom: "40px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e2e8f0",
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
  formGroup: {
    marginBottom: "24px",
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
  inputDisabled: {
    backgroundColor: "#f8fafc",
    color: "#94a3b8",
    cursor: "not-allowed",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "4px",
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
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    borderRadius: "4px",
    border: "2px solid #cbd5e1",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  checkboxLabel: {
    fontSize: "0.9375rem",
    color: "#334155",
    cursor: "pointer",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "52px",
    height: "28px",
    marginRight: "12px",
  },
  switchInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  switchSlider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#cbd5e1",
    transition: "0.4s",
    borderRadius: "34px",
  },
  switchSliderActive: {
    backgroundColor: "#3b82f6",
  },
  switchSliderBefore: {
    position: "absolute",
    content: '""',
    height: "20px",
    width: "20px",
    left: "4px",
    bottom: "4px",
    backgroundColor: "#ffffff",
    transition: "0.4s",
    borderRadius: "50%",
  },
  switchSliderBeforeActive: {
    transform: "translateX(24px)",
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
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: 600,
    color: "#ffffff",
    position: "relative",
  },
  avatarUpload: {
    position: "absolute",
    bottom: "0",
    right: "0",
    backgroundColor: "#ffffff",
    border: "2px solid #e2e8f0",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  avatarUploadHover: {
    backgroundColor: "#f1f5f9",
    borderColor: "#3b82f6",
  },
  themeSelector: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  themeOption: {
    flex: 1,
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
  },
  themeOptionActive: {
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
  themeOptionHover: {
    borderColor: "#94a3b8",
  },
  themeIcon: {
    marginBottom: "12px",
  },
  themeName: {
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "4px",
  },
  themeDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
  },
  dangerZone: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    padding: "24px",
    marginTop: "40px",
  },
  dangerZoneTitle: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#991b1b",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  dangerZoneDescription: {
    fontSize: "0.875rem",
    color: "#991b1b",
    marginBottom: "20px",
  },
  saveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginTop: "24px",
    transition: "all 0.3s",
  },
  saved: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  saving: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  notSaved: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
  },
};

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Nidhal Adhibi',
    email: 'contact@example.com',
    phone: '+216 12 345 678',
    company: 'Mon Entreprise',
    position: 'Administrateur',
  });
  const [language, setLanguage] = useState('fr');
  const [currency, setCurrency] = useState('TND');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: true,
    lowStock: true,
    newClient: true,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    autoLogout: true,
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saveStatus, setSaveStatus] = useState('notSaved');
  const [hoverStates, setHoverStates] = useState({});

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: <User size={16} /> },
    { id: 'security', label: 'Sécurité', icon: <Lock size={16} /> },
    { id: 'preferences', label: 'Préférences', icon: <Globe size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'appearance', label: 'Apparence', icon: <Brush size={16} /> },
    { id: 'data', label: 'Données', icon: <Database size={16} /> },
  ];

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  const currencies = [
    { value: 'TND', label: 'Dinar Tunisien (DT)', symbol: 'DT' },
    { value: 'EUR', label: 'Euro (€)', symbol: '€' },
    { value: 'USD', label: 'Dollar US ($)', symbol: '$' },
  ];

  const themes = [
    { id: 'light', name: 'Clair', icon: <Sun size={24} />, description: 'Interface claire et lumineuse' },
    { id: 'dark', name: 'Sombre', icon: <Moon size={24} />, description: 'Interface sombre pour les yeux' },
    { id: 'auto', name: 'Auto', icon: <SettingsIcon size={24} />, description: 'Suivre les préférences système' },
  ];

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaveStatus('notSaved');
  };

  const handlePasswordChange = (field, value) => {
    setPasswords({ ...passwords, [field]: value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setSaveStatus('notSaved');
  };

  const toggleSecurity = (key) => {
    setSecurity({ ...security, [key]: !security[key] });
    setSaveStatus('notSaved');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Simuler l'enregistrement
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('notSaved'), 3000);
    }, 1000);
  };

  const handleExportData = () => {
    alert('Export des données démarré...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      alert('Compte marqué pour suppression...');
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <>
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>
                {profile.name.charAt(0).toUpperCase()}
                <div 
                  style={{
                    ...styles.avatarUpload,
                    ...(hoverStates.avatarUpload ? styles.avatarUploadHover : {})
                  }}
                  onMouseEnter={() => setHoverStates({...hoverStates, avatarUpload: true})}
                  onMouseLeave={() => setHoverStates({...hoverStates, avatarUpload: false})}
                >
                  <Upload size={16} />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.125rem", color: "#1e293b" }}>
                  {profile.name}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
                  {profile.position} • {profile.company}
                </div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Nom complet <span style={styles.requiredLabel}>*</span>
              </label>
              <input
                style={styles.input}
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                onBlur={(e) => e.target.style = styles.input}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email <span style={styles.requiredLabel}>*</span>
                </label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Téléphone</label>
                <input
                  style={styles.input}
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Entreprise</label>
                <input
                  style={styles.input}
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleProfileChange}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Poste</label>
                <input
                  style={styles.input}
                  type="text"
                  name="position"
                  value={profile.position}
                  onChange={handleProfileChange}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>
            </div>
          </>
        );

      case 'security':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe actuel</label>
              <div style={styles.passwordContainer}>
                <input
                  style={styles.input}
                  type={showPassword.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  placeholder="••••••••"
                />
                <button
                  style={styles.passwordToggle}
                  onClick={() => toggleShowPassword('current')}
                >
                  {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nouveau mot de passe</label>
              <div style={styles.passwordContainer}>
                <input
                  style={styles.input}
                  type={showPassword.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  placeholder="••••••••"
                />
                <button
                  style={styles.passwordToggle}
                  onClick={() => toggleShowPassword('new')}
                >
                  {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirmer le nouveau mot de passe</label>
              <div style={styles.passwordContainer}>
                <input
                  style={styles.input}
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  placeholder="••••••••"
                />
                <button
                  style={styles.passwordToggle}
                  onClick={() => toggleShowPassword('confirm')}
                >
                  {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(hoverStates.changePassword ? styles.buttonPrimaryHover : {})
              }}
              onMouseEnter={() => setHoverStates({...hoverStates, changePassword: true})}
              onMouseLeave={() => setHoverStates({...hoverStates, changePassword: false})}
            >
              <Key size={16} />
              Changer le mot de passe
            </button>

            <div style={{ marginTop: "32px" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: "20px" }}>
                <Shield size={20} style={{ verticalAlign: "middle", marginRight: "8px" }} />
                Sécurité avancée
              </h3>

              <div style={styles.checkboxGroup}>
                <div
                  style={{
                    ...styles.switch,
                    ...(security.twoFactor ? { borderColor: "#3b82f6" } : {})
                  }}
                  onClick={() => toggleSecurity('twoFactor')}
                >
                  <input
                    type="checkbox"
                    style={styles.switchInput}
                    checked={security.twoFactor}
                    readOnly
                  />
                  <span style={{
                    ...styles.switchSlider,
                    ...(security.twoFactor ? styles.switchSliderActive : {})
                  }}>
                    <span style={{
                      ...styles.switchSliderBefore,
                      ...(security.twoFactor ? styles.switchSliderBeforeActive : {})
                    }} />
                  </span>
                </div>
                <div>
                  <div style={styles.checkboxLabel}>Authentification à deux facteurs (2FA)</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </div>
                </div>
              </div>

              <div style={styles.checkboxGroup}>
                <div
                  style={{
                    ...styles.switch,
                    ...(security.autoLogout ? { borderColor: "#3b82f6" } : {})
                  }}
                  onClick={() => toggleSecurity('autoLogout')}
                >
                  <input
                    type="checkbox"
                    style={styles.switchInput}
                    checked={security.autoLogout}
                    readOnly
                  />
                  <span style={{
                    ...styles.switchSlider,
                    ...(security.autoLogout ? styles.switchSliderActive : {})
                  }}>
                    <span style={{
                      ...styles.switchSliderBefore,
                      ...(security.autoLogout ? styles.switchSliderBeforeActive : {})
                    }} />
                  </span>
                </div>
                <div>
                  <div style={styles.checkboxLabel}>Déconnexion automatique</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Déconnexion après 30 minutes d'inactivité
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'preferences':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Langue de l'interface</label>
              <select
                style={{
                  ...styles.select,
                  ...(language ? { borderColor: "#3b82f6" } : {})
                }}
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setSaveStatus('notSaved');
                }}
                onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
                onBlur={(e) => e.target.style = styles.select}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Devise par défaut</label>
              <select
                style={{
                  ...styles.select,
                  ...(currency ? { borderColor: "#3b82f6" } : {})
                }}
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setSaveStatus('notSaved');
                }}
                onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
                onBlur={(e) => e.target.style = styles.select}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Format de date</label>
              <select
                style={styles.select}
                onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
                onBlur={(e) => e.target.style = styles.select}
              >
                <option value="fr-FR">JJ/MM/AAAA (Français)</option>
                <option value="en-US">MM/JJ/AAAA (Anglais)</option>
                <option value="ar-SA">AAAA/MM/JJ (Arabe)</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Fuseau horaire</label>
              <select
                style={styles.select}
                defaultValue="Africa/Tunis"
                onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
                onBlur={(e) => e.target.style = styles.select}
              >
                <option value="Africa/Tunis">Tunis (GMT+1)</option>
                <option value="Europe/Paris">Paris (GMT+1)</option>
                <option value="America/New_York">New York (GMT-5)</option>
              </select>
            </div>
          </>
        );

      case 'notifications':
        return (
          <>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: "20px" }}>
              Préférences de notification
            </h3>

            <div style={styles.checkboxGroup}>
              <div
                style={{
                  ...styles.checkbox,
                  ...(notifications.email ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleNotification('email')}
              >
                {notifications.email && <Check size={14} color="#ffffff" />}
              </div>
              <div>
                <div style={styles.checkboxLabel}>Notifications par email</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  Recevez les mises à jour importantes par email
                </div>
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <div
                style={{
                  ...styles.checkbox,
                  ...(notifications.push ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleNotification('push')}
              >
                {notifications.push && <Check size={14} color="#ffffff" />}
              </div>
              <div>
                <div style={styles.checkboxLabel}>Notifications push</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  Recevez des notifications dans votre navigateur
                </div>
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <div
                style={{
                  ...styles.checkbox,
                  ...(notifications.weeklyReport ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleNotification('weeklyReport')}
              >
                {notifications.weeklyReport && <Check size={14} color="#ffffff" />}
              </div>
              <div>
                <div style={styles.checkboxLabel}>Rapport hebdomadaire</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  Recevez un résumé hebdomadaire de votre activité
                </div>
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <div
                style={{
                  ...styles.checkbox,
                  ...(notifications.lowStock ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleNotification('lowStock')}
              >
                {notifications.lowStock && <Check size={14} color="#ffffff" />}
              </div>
              <div>
                <div style={styles.checkboxLabel}>Alertes de stock faible</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  Soyez informé quand un produit est en rupture de stock
                </div>
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <div
                style={{
                  ...styles.checkbox,
                  ...(notifications.newClient ? styles.checkboxChecked : {})
                }}
                onClick={() => toggleNotification('newClient')}
              >
                {notifications.newClient && <Check size={14} color="#ffffff" />}
              </div>
              <div>
                <div style={styles.checkboxLabel}>Nouveaux clients</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  Recevez une notification lorsqu'un nouveau client est ajouté
                </div>
              </div>
            </div>
          </>
        );

      case 'appearance':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Thème de l'application</label>
              <div style={styles.themeSelector}>
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.id}
                    style={{
                      ...styles.themeOption,
                      ...(theme === themeOption.id ? styles.themeOptionActive : {}),
                      ...(hoverStates[`theme-${themeOption.id}`] ? styles.themeOptionHover : {})
                    }}
                    onClick={() => {
                      setTheme(themeOption.id);
                      setSaveStatus('notSaved');
                    }}
                    onMouseEnter={() => setHoverStates({...hoverStates, [`theme-${themeOption.id}`]: true})}
                    onMouseLeave={() => setHoverStates({...hoverStates, [`theme-${themeOption.id}`]: false})}
                  >
                    <div style={styles.themeIcon}>{themeOption.icon}</div>
                    <div style={styles.themeName}>{themeOption.name}</div>
                    <div style={styles.themeDescription}>{themeOption.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Densité de l'interface</label>
              <select
                style={styles.select}
                defaultValue="comfortable"
                onFocus={(e) => e.target.style = {...styles.select, ...styles.selectFocus}}
                onBlur={(e) => e.target.style = styles.select}
              >
                <option value="comfortable">Confortable (par défaut)</option>
                <option value="compact">Compact</option>
                <option value="spacious">Spacieux</option>
              </select>
            </div>
          </>
        );

      case 'data':
        return (
          <>
            <div style={styles.formGroup}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1e293b", marginBottom: "20px" }}>
                Export des données
              </h3>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>
                Téléchargez une copie de toutes vos données au format JSON ou CSV.
              </p>
              <button
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(hoverStates.exportData ? { backgroundColor: "#475569" } : {})
                }}
                onClick={handleExportData}
                onMouseEnter={() => setHoverStates({...hoverStates, exportData: true})}
                onMouseLeave={() => setHoverStates({...hoverStates, exportData: false})}
              >
                <Download size={16} />
                Exporter toutes les données
              </button>
            </div>

            <div style={styles.dangerZone}>
              <h3 style={styles.dangerZoneTitle}>
                <AlertCircle size={20} />
                Zone de danger
              </h3>
              <p style={styles.dangerZoneDescription}>
                Ces actions sont irréversibles. Veuillez agir avec prudence.
              </p>
              
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: 600, color: "#991b1b", marginBottom: "8px" }}>
                  Supprimer toutes les données
                </div>
                <div style={{ fontSize: "0.875rem", color: "#991b1b", marginBottom: "12px" }}>
                  Supprime définitivement tous les clients, produits et factures. Cette action ne peut pas être annulée.
                </div>
                <button
                  style={{
                    ...styles.button,
                    ...styles.buttonDanger,
                    ...(hoverStates.deleteData ? styles.buttonDangerHover : {})
                  }}
                  onMouseEnter={() => setHoverStates({...hoverStates, deleteData: true})}
                  onMouseLeave={() => setHoverStates({...hoverStates, deleteData: false})}
                >
                  <Trash2 size={16} />
                  Supprimer toutes les données
                </button>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: "#991b1b", marginBottom: "8px" }}>
                  Supprimer le compte
                </div>
                <div style={{ fontSize: "0.875rem", color: "#991b1b", marginBottom: "12px" }}>
                  Supprime définitivement votre compte et toutes les données associées.
                </div>
                <button
                  style={{
                    ...styles.button,
                    ...styles.buttonDanger,
                    ...(hoverStates.deleteAccount ? styles.buttonDangerHover : {})
                  }}
                  onClick={handleDeleteAccount}
                  onMouseEnter={() => setHoverStates({...hoverStates, deleteAccount: true})}
                  onMouseLeave={() => setHoverStates({...hoverStates, deleteAccount: false})}
                >
                  <Trash2 size={16} />
                  Supprimer le compte
                </button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <SettingsIcon size={32} />
          Paramètres
        </h1>
        <p style={styles.subtitle}>
          Gérez vos préférences, votre sécurité et vos paramètres de compte
        </p>
      </div>

      <div style={styles.settingsGrid}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarTitle}>MENU</div>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.menuItem,
                ...(activeSection === item.id ? styles.menuItemActive : {}),
                ...(hoverStates[`menu-${item.id}`] && activeSection !== item.id ? styles.menuItemHover : {})
              }}
              onClick={() => setActiveSection(item.id)}
              onMouseEnter={() => setHoverStates({...hoverStates, [`menu-${item.id}`]: true})}
              onMouseLeave={() => setHoverStates({...hoverStates, [`menu-${item.id}`]: false})}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={styles.menuIcon}>{item.icon}</span>
                {item.label}
              </div>
              <ChevronRight size={16} />
            </div>
          ))}
        </div>

        {/* Contenu principal */}
        <div style={styles.settingsContent}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {menuItems.find(item => item.id === activeSection)?.icon}
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
            <button
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(saveStatus === 'saved' ? { backgroundColor: "#10b981" } : {}),
                ...(hoverStates.save ? styles.buttonPrimaryHover : {})
              }}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              onMouseEnter={() => setHoverStates({...hoverStates, save: true})}
              onMouseLeave={() => setHoverStates({...hoverStates, save: false})}
            >
              {saveStatus === 'saving' ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #ffffff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Enregistrement...
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <Check size={16} />
                  Enregistré
                </>
              ) : (
                <>
                  <Save size={16} />
                  Enregistrer
                </>
              )}
            </button>
          </div>

          <div style={styles.section}>
            {renderSection()}
          </div>

          {saveStatus !== 'notSaved' && (
            <div style={{
              ...styles.saveIndicator,
              ...(saveStatus === 'saved' ? styles.saved : 
                  saveStatus === 'saving' ? styles.saving : styles.notSaved)
            }}>
              {saveStatus === 'saved' ? (
                <>
                  <Check size={16} />
                  Modifications enregistrées avec succès
                </>
              ) : saveStatus === 'saving' ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Enregistrement en cours...
                </>
              ) : null}
            </div>
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
            
            .settings-grid {
              grid-template-columns: 1fr;
            }
            
            .sidebar {
              display: flex;
              overflow-x: auto;
              gap: 12px;
              padding: 16px;
            }
            
            .menu-item {
              white-space: nowrap;
              padding: 8px 16px;
            }
            
            .menu-icon {
              margin-right: 8px;
            }
          }
        `}
      </style>
    </div>
  );
}