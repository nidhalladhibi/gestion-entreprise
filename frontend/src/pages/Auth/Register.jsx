import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validations
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser(form.name.trim(), form.email.trim(), form.password);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        // Rediriger vers la page d'accueil
        navigate("/", { replace: true });
      } else {
        setError(result.error || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Créer un compte</h2>
        <p style={styles.subtitle}>Rejoignez-nous en quelques secondes.</p>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              name="name"
              style={styles.input}
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Adresse Email</label>
            <input
              id="email"
              type="email"
              name="email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
              placeholder="exemple@domaine.com"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              style={styles.input}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              style={styles.input}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Création en cours..." : "S'inscrire"}
          </button>
        </form>

        <div style={styles.footer}>
          Vous avez déjà un compte ?{" "}
          <Link to="/login" style={styles.link}>
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '10px',
    marginTop: 0,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
    marginTop: 0,
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid #fcc',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#444',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '25px',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '5px',
  }
};