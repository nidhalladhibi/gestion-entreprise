const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL)
    ? process.env.REACT_APP_API_URL
    : "https://gestion-entreprise-6bf8.onrender.com/api";


// Fonction utilitaire pour les appels API
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      // Si le token est invalide ou expiré (erreur 401), on déconnecte l'utilisateur
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = '/login'; // Redirection vers la page de connexion
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }
      // Pour les autres erreurs (ex: 404), on essaie de lire le message
      const errorText = await response.text();
      throw new Error(errorText || `Erreur ${response.status}`);
    }

    // Si la réponse est OK (2xx), on la traite
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      // Si la réponse n'est pas JSON mais qu'elle est OK, on ne fait rien.
      // On pourrait aussi retourner le texte si nécessaire.
      return null;
    }
  } catch (error) {
    // Gérer les erreurs de connexion réseau
    const errorMessage = error.message || String(error);
    if (
      errorMessage.includes("Failed to fetch") || 
      errorMessage.includes("ERR_CONNECTION_REFUSED") ||
      errorMessage.includes("NetworkError") ||
      error instanceof TypeError
    ) {
      throw new Error("Le serveur backend n'est pas accessible. Veuillez démarrer le serveur backend sur le port 5000.");
    }
    // Si c'est déjà une Error avec un message, la relancer
    if (error instanceof Error) {
      throw error;
    }
    // Sinon, créer une nouvelle Error
    throw new Error(errorMessage || "Une erreur est survenue");
  }
};

// Service d'authentification
export const authService = {
  register: async (name, email, password) => {
    return apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },

  login: async (email, password) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

export default apiCall;
