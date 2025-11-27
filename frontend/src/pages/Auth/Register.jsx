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
      <h2>إنشاء حساب</h2>

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
          <label>الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
            required
            disabled={loading}
          />
        </div>

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

        <div className="input-group">
          <label>تأكيد كلمة السر</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
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
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        لديك حساب بالفعل؟{" "}
        <Link 
          to="/login" 
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}