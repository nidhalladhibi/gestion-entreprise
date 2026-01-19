import React, { createContext, useState, useEffect, useContext } from 'react';
import apiCall from '../../services/api'; // Utilisation de l'exportation par défaut
import { AuthContext } from '../AuthContext';

// 1. Création du contexte
export const DataContext = createContext();

// 2. Création du fournisseur de données (Provider)
export default function DataProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  // Se déclenche quand l'utilisateur se connecte/déconnecte
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          // On charge les clients et les produits en parallèle
          const [clientsRes, productsRes] = await Promise.all([
            apiCall('/clients'), // Correction: Appel direct de la fonction
            apiCall('/products')  // Correction: Appel direct de la fonction
          ]);
          setClients(clientsRes);
          setProducts(productsRes);
        } catch (err) {
          setError(err.message);
          console.error("Erreur lors de la récupération des données:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // Si pas d'utilisateur, on vide les données
        setClients([]);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // --- Fonctions pour les clients ---
  const addClient = async (clientData) => {
    try {
      const newClient = await apiCall('/clients', {
        method: 'POST',
        body: JSON.stringify(clientData),
      });
      setClients(prev => [newClient, ...prev]); // Ajoute en haut de la liste
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const deleteClient = async (id) => {
    try {
      await apiCall(`/clients/${id}`, { method: 'DELETE' });
      setClients(prev => prev.filter(client => client._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const getClientById = async (id) => {
    try {
      const client = await apiCall(`/clients/${id}`);
      return { success: true, data: client };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const updateClient = async (id, clientData) => {
    try {
      const updated = await apiCall(`/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(clientData),
      });
      setClients(prev =>
        prev.map(client => (client._id === id ? updated : client))
      );
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err };
    }
  };


  // --- Fonctions pour les produits ---
  const addProduct = async (productData) => {
    try {
      const newProduct = await apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      setProducts(prev => [newProduct, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiCall(`/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(product => product._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const getProductById = async (id) => {
    try {
      const product = await apiCall(`/products/${id}`);
      return { success: true, data: product };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updated = await apiCall(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      setProducts(prev =>
        prev.map(p => (p._id === id ? updated : p))
      );
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  // 3. On fournit les données et les fonctions
  const value = {
    clients,
    products,
    loading,
    error,
    addClient,
    deleteClient,
    getClientById,
    updateClient,
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
