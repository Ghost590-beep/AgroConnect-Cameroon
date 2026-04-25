import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import farmerImg from "../../assets/loginImage.jpeg";

// ─── Types ───────────────────────────────────────────────────
// --- Extend FormState to include cityTown ---
interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  cityTown: string;
}

type FormErrors = Partial<FormState>;

// ─── Field config (keeps JSX DRY) ────────────────────────────
// --- Add City/Town field config ---
const FIELDS: {
  id: keyof FormState;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Repeat your password",
    autoComplete: "new-password",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+237 6XX XXX XXX",
    autoComplete: "tel",
  },
  {
    id: "cityTown",
    label: "City/Town",
    type: "text",
    placeholder: "Enter your city or town",
    autoComplete: "address-level2",
  },
];

// ─── Component ───────────────────────────────────────────────
export default function Register() {
  // --- Add cityTown to form state ---
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cityTown: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Clear individual field error on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Client-side validation
  // --- Add cityTown validation ---
  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.cityTown.trim()) next.cityTown = "City/Town is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: call POST /api/auth/register when backend is ready
    console.log("Register payload →", form);
  };

  const handleGoogle = () => {
    // TODO: wire up Google OAuth when backend is ready
    console.log("Google sign-up clicked");
  };

  return (
    <main className="auth-page">
      <div className="auth-card auth-card--tall">
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

        {/* ── Right: register form ─────────────────────────── */}
        <div className="auth-form-panel">
          <h1 className="auth-heading">Create Your Account</h1>

          <form onSubmit={handleSubmit} noValidate>
            {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => (
              <div className="form-field" key={id}>
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  type={type}
                  name={id}
                  placeholder={placeholder}
                  value={form[id]}
                  onChange={handleChange}
                  autoComplete={autoComplete}
                />
                {errors[id] && <p className="form-error">{errors[id]}</p>}
              </div>
            ))}

            {/* Submit */}
            <button type="submit" className="btn-submit">
              Sign Up
            </button>

            {/* Divider */}
            <div className="form-divider">
              <span>or</span>
            </div>

            {/* Google sign-up */}
            <button type="button" className="btn-google" onClick={handleGoogle}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
              />
              Continue with Google
            </button>
          </form>

          {/* Switch to Login */}
          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch__link">
              Log In
            </Link>
          </p>

          {/* Decorative leaves */}
          <span className="leaf-decor" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
