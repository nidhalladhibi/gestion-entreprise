import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <h2 className="logo">📊</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/clients" className={({isActive}) => isActive ? "active" : ""}>
          👥 Clients
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? "active" : ""}>
          📦 Products
        </NavLink>
        <NavLink to="/invoice" className={({isActive}) => isActive ? "active" : ""}>
          🧾 Invoices
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>
          ⚙️ Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <small>© {new Date().getFullYear()} شركتك</small>
      </div>
    </aside>
  );
}
