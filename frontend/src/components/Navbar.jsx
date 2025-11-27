import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <button className="burger" onClick={onToggleSidebar} aria-label="Ouvrir/Fermer le menu">
        ☰
      </button>

      <div className="brand">
        <h3>Mon Gestionnaire</h3>
      </div>

      <div className="nav-actions">
        <div className="search">
          <input type="text" placeholder="Rechercher..." />
        </div>

        <div className="profile">
          <span className="avatar">
            {user?.name?.charAt(0) || "N"}
          </span>
          <div className="profile-info">
            <div className="name">{user?.name || "Nidhal"}</div>
            <small>Administrateur</small>
          </div>
        </div>

        {/* Bouton Déconnexion */}
        <button className="logout-btn" onClick={logout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
