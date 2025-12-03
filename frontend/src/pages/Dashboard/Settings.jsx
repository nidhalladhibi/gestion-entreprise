import React, { useState } from 'react';

// Styles pour une apparence moderne
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '25px',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: '#333',
    margin: '0 0 20px 0',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
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
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 25px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    marginTop: '10px',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    backgroundColor: 'white',
  }
};

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Nidhal Adhibi', email: 'contact@example.com' });
  const [language, setLanguage] = useState('fr');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1>⚙️ Paramètres</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Modifier votre profil, langue et configurations.</p>

      {/* Carte pour les informations du profil */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Profil Utilisateur</h2>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Nom complet</label>
          <input style={styles.input} type="text" id="name" name="name" value={profile.name} onChange={handleProfileChange} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Adresse e-mail</label>
          <input style={styles.input} type="email" id="email" name="email" value={profile.email} onChange={handleProfileChange} />
        </div>
        <button style={styles.button}>Enregistrer les modifications</button>
      </div>

      {/* Carte pour la sécurité */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Sécurité</h2>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Nouveau mot de passe</label>
          <input style={styles.input} type="password" id="password" placeholder="••••••••" />
        </div>
        <button style={styles.button}>Changer le mot de passe</button>
      </div>

      {/* Carte pour les préférences */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Préférences</h2>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="language">Langue</label>
          <select style={styles.select} id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}
