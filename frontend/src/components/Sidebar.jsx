import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <h2 className="logo">📊</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard/home" className={({isActive}) => isActive ? "active" : ""}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/dashboard/clients" className={({isActive}) => isActive ? "active" : ""}>
          👥 Clients
        </NavLink>
        <NavLink to="/dashboard/products" className={({isActive}) => isActive ? "active" : ""}>
          📦 Products
        </NavLink>
        <NavLink to="/dashboard/invoice" className={({isActive}) => isActive ? "active" : ""}>
          🧾 Invoices
        </NavLink>
        <NavLink to="/dashboard/settings" className={({isActive}) => isActive ? "active" : ""}>
          ⚙️ Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <small>© {new Date().getFullYear()} شركتك</small>
      </div>
    </aside>
  );
}