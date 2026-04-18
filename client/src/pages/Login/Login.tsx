import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import farmerImg from "../../assets/loginImage.jpeg";

// ─── Types ───────────────────────────────────────────────────
interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

// ─── Component ───────────────────────────────────────────────
export default function Login() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  // Clear individual field error on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Simple client-side validation
  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: call POST /api/auth/login when backend is ready
    console.log("Login payload →", form);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        {/* ── Left: farmer photo panel ─────────────────────── */}
        <div className="auth-photo">
          <img src={farmerImg} alt="Farmer holding fresh produce" />

          {/* Brand badge sits over the photo */}
          <div className="auth-badge">
            <span>🌿</span>
            <span className="auth-badge__text">
              Agro<strong>Family</strong>
            </span>
          </div>
        </div>

        {/* ── Right: login form ────────────────────────────── */}
        <div className="auth-form-panel">
          <h1 className="auth-heading">Welcome Back!</h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <span className="form-link--right">Forgot password?</span>
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit">
              Log In
            </button>
          </form>

          {/* Switch to Register */}
          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch__link">
              Sign Up
            </Link>
          </p>

          {/* Decorative leaves */}
          <span className="leaf-decor" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
