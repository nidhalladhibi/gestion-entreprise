import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Users, 
  Package, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar
} from "react-feather";

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile, isDarkMode, onToggleSidebar }) {
  // Palette de couleurs bleu-gris moderne
  const colors = {
    blueGray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    primary: {
      light: '#3b82f6',
      main: '#2563eb',
      dark: '#1d4ed8',
    },
    accent: '#38bdf8',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const menuItems = [
    { path: "/dashboard/home", icon: Home, label: "Dashboard", color: colors.primary.main },
    { path: "/dashboard/clients", icon: Users, label: "Clients", color: colors.success },
    { path: "/dashboard/products", icon: Package, label: "Produits", color: colors.warning },
    { path: "/dashboard/invoice", icon: FileText, label: "Factures", color: colors.accent },
    { path: "/dashboard/reports", icon: TrendingUp, label: "Rapports", color: colors.blueGray[500] },
    { path: "/dashboard/calendar", icon: Calendar, label: "Calendrier", color: colors.blueGray[400] },
    { path: "/dashboard/settings", icon: Settings, label: "Paramètres", color: colors.blueGray[600] },
  ];

  // Fonction pour gérer le toggle avec débogage
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggle button clicked"); // Pour déboguer
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  return (
    <>
      <style>
        {`
          .sidebar {
            width: ${collapsed ? '85px' : '280px'};
            height: 100vh;
            background: ${isDarkMode ? colors.blueGray[900] : '#ffffff'};
            border-right: 1px solid ${isDarkMode ? colors.blueGray[800] : colors.blueGray[200]};
            position: fixed;
            left: 0;
            top: 0;
            z-index: 200;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            box-shadow: ${isDarkMode ? '4px 0 30px rgba(0,0,0,0.3)' : '4px 0 30px rgba(15, 23, 42, 0.08)'};
          }

          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(${mobileOpen ? '0' : '-100%'});
              width: 280px;
            }
          }

          .sidebar-header {
            height: 70px;
            padding: 0 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${isDarkMode ? colors.blueGray[800] : colors.blueGray[200]};
            position: relative;
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex: 1;
            overflow: hidden;
          }

          .logo-icon {
            width: 42px;
            height: 42px;
            background: ${colors.primary.main};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.3rem;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            flex-shrink: 0;
          }

          .logo-text {
            font-size: 1.2rem;
            font-weight: 600;
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            opacity: ${collapsed ? 0 : 1};
            transition: opacity 0.2s;
            letter-spacing: -0.3px;
            white-space: nowrap;
          }

          .toggle-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            border: none;
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${isDarkMode ? colors.blueGray[400] : colors.blueGray[600]};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            position: ${collapsed ? 'absolute' : 'relative'};
            right: ${collapsed ? '50%' : 'auto'};
            transform: ${collapsed ? 'translateX(50%)' : 'none'};
            z-index: 10;
            border: 1px solid ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
          }

          .toggle-btn:hover {
            background: ${isDarkMode ? colors.primary.main : colors.primary.main};
            color: #ffffff;
            transform: ${collapsed ? 'translateX(50%) scale(1.1)' : 'scale(1.1)'};
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          .toggle-btn:active {
            transform: ${collapsed ? 'translateX(50%) scale(0.95)' : 'scale(0.95)'};
          }

          .sidebar-nav {
            flex: 1;
            padding: 2rem 1rem;
            overflow-y: auto;
          }

          .nav-section {
            margin-bottom: 2rem;
          }

          .nav-section-title {
            padding: 0 1rem;
            margin-bottom: 1rem;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: ${isDarkMode ? colors.blueGray[500] : colors.blueGray[400]};
            opacity: ${collapsed ? 0 : 1};
            height: ${collapsed ? 0 : 'auto'};
            overflow: hidden;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem 1rem;
            margin: 0.2rem 0;
            border-radius: 12px;
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            text-decoration: none;
            transition: all 0.2s;
            position: relative;
            white-space: nowrap;
            font-weight: 500;
            cursor: pointer;
          }

          .nav-link:hover {
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
          }

          .nav-link.active {
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${colors.primary.main};
            font-weight: 600;
          }

          .nav-link.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 60%;
            background: ${colors.primary.main};
            border-radius: 0 3px 3px 0;
          }

          .nav-icon {
            min-width: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nav-label {
            font-size: 0.95rem;
            opacity: ${collapsed ? 0 : 1};
            transition: opacity 0.2s;
          }

          .nav-badge {
            margin-left: auto;
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            padding: 0.2rem 0.5rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 500;
            opacity: ${collapsed ? 0 : 1};
          }

          .sidebar-footer {
            padding: 1.5rem 1rem;
            border-top: 1px solid ${isDarkMode ? colors.blueGray[800] : colors.blueGray[200]};
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem;
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            border-radius: 12px;
            border: 1px solid ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            cursor: pointer;
            transition: all 0.2s;
          }

          .user-info:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
          }

          .user-avatar {
            width: 40px;
            height: 40px;
            background: ${colors.primary.main};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            flex-shrink: 0;
          }

          .user-details {
            opacity: ${collapsed ? 0 : 1};
            transition: opacity 0.2s;
            overflow: hidden;
          }

          .user-name {
            font-size: 0.95rem;
            font-weight: 600;
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            white-space: nowrap;
          }

          .user-email {
            font-size: 0.7rem;
            color: ${isDarkMode ? colors.blueGray[400] : colors.blueGray[500]};
            white-space: nowrap;
          }

          .copyright {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.7rem;
            color: ${isDarkMode ? colors.blueGray[600] : colors.blueGray[400]};
            opacity: ${collapsed ? 0 : 1};
          }

          .mobile-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.5);
            z-index: 199;
            backdrop-filter: blur(4px);
          }

          @media (max-width: 768px) {
            .mobile-overlay {
              display: ${mobileOpen ? 'block' : 'none'};
            }
            
            .toggle-btn {
              position: relative !important;
              right: auto !important;
              transform: none !important;
            }
            
            .toggle-btn:hover {
              transform: scale(1.1) !important;
            }
          }

          /* Scrollbar personnalisée */
          .sidebar-nav::-webkit-scrollbar {
            width: 4px;
          }

          .sidebar-nav::-webkit-scrollbar-track {
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
          }

          .sidebar-nav::-webkit-scrollbar-thumb {
            background: ${isDarkMode ? colors.blueGray[600] : colors.blueGray[300]};
            border-radius: 10px;
          }

          .sidebar-nav::-webkit-scrollbar-thumb:hover {
            background: ${isDarkMode ? colors.blueGray[500] : colors.blueGray[400]};
          }
        `}
      </style>

      <>
        <div className="mobile-overlay" onClick={onCloseMobile} />
        
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo-icon">GE</div>
              <span className="logo-text">GestionPro</span>
            </div>
            
            {/* Bouton toggle - toujours visible */}
            <button 
              className="toggle-btn" 
              onClick={handleToggle}
              aria-label={collapsed ? "Développer la sidebar" : "Réduire la sidebar"}
              title={collapsed ? "Développer" : "Réduire"}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">PRINCIPAL</div>
              {menuItems.slice(0, 5).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={onCloseMobile}
                >
                  <span className="nav-icon">
                    <item.icon size={20} color={item.color} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {item.label === "Factures" && <span className="nav-badge">3</span>}
                  {item.label === "Clients" && <span className="nav-badge">12</span>}
                </NavLink>
              ))}
            </div>

            <div className="nav-section">
              <div className="nav-section-title">AUTRES</div>
              {menuItems.slice(5).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={onCloseMobile}
                >
                  <span className="nav-icon">
                    <item.icon size={20} color={item.color} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">NL</div>
              <div className="user-details">
                <div className="user-name">Nidhal Ladhibi</div>
                <div className="user-email">admin@gestionpro.com</div>
              </div>
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} GestionPro
            </div>
          </div>
        </aside>
      </>
    </>
  );
}