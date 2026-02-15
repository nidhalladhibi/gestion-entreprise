import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Moon,
  Sun,
  HelpCircle
} from "react-feather";

export default function Navbar({ onToggleSidebar, collapsed, toggleTheme, isDarkMode }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Nouvelle facture créée", time: "5 min" },
    { id: 2, text: "Client ajouté", time: "15 min" },
    { id: 3, text: "Stock faible", time: "1 heure" },
  ];

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

  return (
    <>
      <style>
        {`
          .navbar {
            height: 70px;
            background: ${isDarkMode ? colors.blueGray[900] : '#ffffff'};
            border-bottom: 1px solid ${isDarkMode ? colors.blueGray[800] : colors.blueGray[200]};
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
            transition: all 0.3s ease;
            box-shadow: ${isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(15, 23, 42, 0.08)'};
          }

          .navbar-left {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .burger {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            border: none;
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            font-size: 1.3rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .burger:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[800]};
            transform: scale(1.05);
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .brand-logo {
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
          }

          .brand h3 {
            font-size: 1.3rem;
            font-weight: 600;
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            margin: 0;
            letter-spacing: -0.3px;
          }

          .brand-badge {
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            padding: 0.2rem 0.7rem;
            border-radius: 30px;
            font-size: 0.7rem;
            font-weight: 500;
            margin-left: 0.7rem;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .action-btn {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            border: none;
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            position: relative;
          }

          .action-btn:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[800]};
            transform: translateY(-2px);
          }

          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: ${colors.danger};
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            border: 2px solid ${isDarkMode ? colors.blueGray[900] : '#ffffff'};
          }

          .profile-section {
            position: relative;
          }

          .profile-trigger {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.4rem 1.2rem 0.4rem 0.4rem;
            background: ${isDarkMode ? colors.blueGray[800] : colors.blueGray[100]};
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .profile-trigger:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            transform: translateY(-2px);
          }

          .avatar {
            width: 40px;
            height: 40px;
            background: ${colors.primary.main};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .profile-info {
            text-align: left;
          }

          .profile-name {
            font-weight: 600;
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            font-size: 0.95rem;
          }

          .profile-role {
            color: ${isDarkMode ? colors.blueGray[400] : colors.blueGray[500]};
            font-size: 0.75rem;
          }

          .dropdown-menu {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 280px;
            background: ${isDarkMode ? colors.blueGray[800] : '#ffffff'};
            border: 1px solid ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            animation: slideDown 0.2s ease;
          }

          .notifications-menu {
            width: 340px;
          }

          .menu-header {
            padding: 1rem 1.2rem;
            border-bottom: 1px solid ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            font-weight: 600;
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            background: ${isDarkMode ? colors.blueGray[900] : colors.blueGray[50]};
          }

          .menu-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.9rem 1.2rem;
            color: ${isDarkMode ? colors.blueGray[300] : colors.blueGray[600]};
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
          }

          .menu-item:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[100]};
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
          }

          .notification-item {
            padding: 1rem 1.2rem;
            border-bottom: 1px solid ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            transition: all 0.2s;
          }

          .notification-item:hover {
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[100]};
          }

          .notification-title {
            color: ${isDarkMode ? '#ffffff' : colors.blueGray[900]};
            font-size: 0.95rem;
            font-weight: 500;
            margin-bottom: 0.3rem;
          }

          .notification-time {
            color: ${isDarkMode ? colors.blueGray[400] : colors.blueGray[500]};
            font-size: 0.75rem;
          }

          .menu-divider {
            height: 1px;
            background: ${isDarkMode ? colors.blueGray[700] : colors.blueGray[200]};
            margin: 0.5rem 0;
          }

          .logout-btn {
            width: 100%;
            padding: 0.9rem;
            border: none;
            background: ${colors.danger}20;
            color: ${colors.danger};
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.95rem;
          }

          .logout-btn:hover {
            background: ${colors.danger};
            color: white;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .navbar {
              padding: 0 1rem;
            }
            
            .brand h3 {
              font-size: 1.1rem;
            }
            
            .profile-info {
              display: none;
            }
            
            .brand-badge {
              display: none;
            }
          }
        `}
      </style>

      <header className="navbar">
        <div className="navbar-left">
          <button className="burger" onClick={onToggleSidebar}>
            <Menu size={22} />
          </button>

          <div className="brand">
            <div className="brand-logo">GE</div>
            <h3>
              GestionPro
              <span className="brand-badge">v2.0</span>
            </h3>
          </div>
        </div>

        <div className="nav-actions">
          <button className="action-btn" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="profile-section">
            <button className="action-btn" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="dropdown-menu notifications-menu">
                <div className="menu-header">🔔 Notifications</div>
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <div className="notification-title">{notif.text}</div>
                    <div className="notification-time">Il y a {notif.time}</div>
                  </div>
                ))}
                <div className="menu-item" style={{ justifyContent: 'center' }}>
                  Voir toutes les notifications
                </div>
              </div>
            )}
          </div>

          <div className="profile-section">
            <div className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="avatar">
                {user?.name?.charAt(0) || "ND"}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user?.name || "Nidhal Ladhibi"}</div>
                <div className="profile-role">Administrateur</div>
              </div>
              <ChevronDown size={18} color={isDarkMode ? colors.blueGray[400] : colors.blueGray[500]} />
            </div>

            {showProfileMenu && (
              <div className="dropdown-menu">
                <div className="menu-item">
                  <User size={18} /> Mon Profil
                </div>
                <div className="menu-item">
                  <Settings size={18} /> Paramètres
                </div>
                <div className="menu-item">
                  <HelpCircle size={18} /> Aide
                </div>
                <div className="menu-divider" />
                <button className="logout-btn" onClick={logout}>
                  <LogOut size={18} /> Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}