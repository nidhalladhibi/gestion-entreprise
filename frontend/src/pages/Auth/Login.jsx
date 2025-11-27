import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation côté client
    if (!form.email.trim() || !form.password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(form.email.trim(), form.password);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setForm({ email: "", password: "" });
        // Rediriger vers la page d'accueil
        navigate("/", { replace: true });
      } else {
        setError(result.error || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>تسجيل الدخول</h2>

      {error && (
        <div style={{ 
          padding: "0.75rem", 
          marginBottom: "1rem", 
          backgroundColor: "#fee", 
          color: "#c33", 
          borderRadius: "4px",
          textAlign: "center",
          border: "1px solid #fcc",
          fontSize: "0.9rem"
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>كلمة السر</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
        >
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        ليس لديك حساب؟{" "}
        <Link 
          to="/register" 
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          إنشاء حساب
        </Link>
      </p>
    </div>
  );
}