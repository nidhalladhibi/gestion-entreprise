const API_BASE_URL = 
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) || 
  "http://localhost:5000/api";

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
    
    // Vérifier si la réponse est JSON
    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || "Une erreur est survenue");
    }

    if (!response.ok) {
      throw new Error(data.message || "Une erreur est survenue");
    }

    return data;
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

