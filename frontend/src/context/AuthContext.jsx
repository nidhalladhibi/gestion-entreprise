import { createContext, useState, useEffect } from "react";
import { authService } from "../services/api";
import DataProvider from "./DataContext";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      // Enregistrer l'utilisateur (sans stocker la réponse)
      await authService.register(name, email, password);

      // Connexion automatique après inscription
      try {
        const loginResponse = await authService.login(email, password);

        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.user));

        setUser(loginResponse.user);
        return { success: true, data: loginResponse };
      } catch {
        return {
          success: false,
          error:
            "Compte créé avec succès, mais la connexion automatique a échoué. Veuillez vous connecter manuellement.",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Erreur lors de l'enregistrement",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Alias pour compatibilité Navbar
  const logout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        logout,
      }}
    >
      <DataProvider>{children}</DataProvider>
    </AuthContext.Provider>
  );
}
