import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css"; // استورد الـ CSS هنا

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => setCollapsed(!collapsed);

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggle} />
      <div className="main-wrapper">
        <Sidebar collapsed={collapsed} />
        <main className={`main-content ${collapsed ? "expanded" : ""}`}>
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
