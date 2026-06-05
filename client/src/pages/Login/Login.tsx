import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import farmerImg from "../../assets/loginImage.jpeg";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

/* ─── TYPES ─── */
interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

/* ─── COMPONENT ─── */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /* ── Handle input change ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ── Validation ── */
  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      /* loginUser calls the API and returns { token, user } */
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      /* login() saves token + user into AuthContext AND localStorage */
      login(res.token, res.user);

      navigate("/landing");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        {/* ── Left image ── */}
        <div className="auth-photo">
          <img src={farmerImg} alt="Farmer" />
          <div className="auth-badge">
            <span>🌿</span>
            <span className="auth-badge__text">
              Agro<strong>Family</strong>
            </span>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="auth-form-panel">
          <h1 className="auth-heading">Welcome Back!</h1>

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              <span className="form-link--right">Forgot password?</span>
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Switch */}
          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch__link">
              Sign Up
            </Link>
          </p>

          <span className="leaf-decor" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
