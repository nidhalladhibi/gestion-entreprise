import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    console.log("handleToggle called, current collapsed:", collapsed); // Pour déboguer
    if (window.innerWidth <= 640) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggle} />
      {mobileOpen && <div className="sidebar-overlay" onClick={closeMobileSidebar}></div>}
      <div className="main-wrapper">
        <Sidebar 
          collapsed={collapsed} 
          mobileOpen={mobileOpen} 
          onCloseMobile={closeMobileSidebar} 
          onToggleSidebar={handleToggle}  // ← AJOUTEZ CETTE LIGNE
        />
        <main className={`main-content ${collapsed ? "expanded" : ""}`}>
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}