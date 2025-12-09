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
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">Rejoignez-nous en quelques secondes.</p>

        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemple@domaine.com"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? "Création en cours..." : "S'inscrire"}
          </button>
        </form>

        <p className="auth-switch">
          Vous avez déjà un compte ?{" "}
          <Link to="/login">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}