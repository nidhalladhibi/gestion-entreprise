import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Dashboard/Home";
import Clients from "../pages/Dashboard/Clients";
import Products from "../pages/Dashboard/Products";
import Invoice from "../pages/Dashboard/Invoice";
import Settings from "../pages/Dashboard/Settings";
import EditClientPage from "../context/EditClientPage"; // Assurez-vous que ce chemin est correct
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="clients" element={<Clients />} />
          <Route path="client/edit/:id" element={<EditClientPage />} />
          <Route path="products" element={<Products />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard/home" />} />
    </Routes>
  );
}
