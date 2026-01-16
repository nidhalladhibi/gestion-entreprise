import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext'; // Assurez-vous que le chemin est correct

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  message: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  }
};

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
    <div style={styles.container}>
      <h2 style={styles.title}>Modifier le client</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Nom :</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email :</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone">Téléphone :</label>
          <input
            style={styles.input}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="address">Adresse :</label>
          <input
            style={styles.input}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button style={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le client'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}