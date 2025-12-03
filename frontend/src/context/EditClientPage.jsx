import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; // Assurez-vous que le chemin est correct

export default function EditClientPage() {
  const { id } = useParams(); // Récupère l'ID du client depuis l'URL
  const navigate = useNavigate();
  const { getClientById, updateClient } = useContext(DataContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      setMessage('');
      setLoading(true);
      const result = await getClientById(id);
      if (result.success) {
        setFormData({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || '',
          address: result.data.address || '',
        });
      } else {
        setMessage(`Erreur: ${result.error.message}`);
      }
      setLoading(false);
    };

    fetchClient();
  }, [id, getClientById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const result = await updateClient(id, formData);

    setIsSubmitting(false);
    if (result.success) {
      setMessage('Client mis à jour avec succès !');
      // Optionnel : rediriger l'utilisateur après un court délai
      setTimeout(() => navigate('/clients'), 1500);
    } else {
      setMessage(`Erreur: ${result.error.message}`);
    }
  };

  if (loading) {
    return <p>Chargement du client...</p>;
  }

  return (
    <div>
      <h2>Modifier le client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Ajoutez les autres champs (phone, address) de la même manière */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le client'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}