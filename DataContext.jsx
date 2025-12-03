import React, { createContext, useState, useEffect, useContext } from 'react';
import apiCall from '../services/api';
import { AuthContext } from './AuthContext';

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
            apiCall.get('/clients'),
            apiCall.get('/products')
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
      const newClient = await apiCall.post('/clients', clientData);
      setClients(prev => [newClient, ...prev]); // Ajoute en haut de la liste
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const deleteClient = async (id) => {
    try {
      await apiCall.delete(`/clients/${id}`);
      setClients(prev => prev.filter(client => client._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  // --- Fonctions pour les produits ---
  const addProduct = async (productData) => {
    try {
      const newProduct = await apiCall.post('/products', productData);
      setProducts(prev => [newProduct, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiCall.delete(`/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id));
      return { success: true };
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
    addProduct,
    deleteProduct,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}