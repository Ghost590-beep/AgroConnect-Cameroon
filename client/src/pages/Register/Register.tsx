import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import farmerImg from "../../assets/loginImage.jpeg";
import { useAuth } from "../../context/AuthContext";
import { googleSignIn, registerUser } from "../../services/authService";

/* ─── TYPES ─── */
interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  region: string;
}

type FormErrors = Partial<FormState>;

/* ─── FIELD CONFIG ─── */
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
    id: "region",
    label: "Region/City",
    type: "text",
    placeholder: "Enter your region or city",
    autoComplete: "address-level2",
  },
];

/* ─── COMPONENT ─── */
export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    region: "",
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

    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    if (!form.phone.trim()) next.phone = "Phone number is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      /* registerUser calls the API and returns { token, user } */
      const res = await registerUser({
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        location: form.region,
      });

      /* login() saves token + user into AuthContext AND localStorage */
      login(res.token, res.user);

      navigate("/landing");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Google auth placeholder ── */
  const handleGoogle = async () => {
    if (!form.fullName.trim() || !form.email.trim()) {
      alert("Please enter your full name and email before continuing with Google.");
      return;
    }

    try {
      setLoading(true);
      const res = await googleSignIn({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        location: form.region || undefined,
      });

      login(res.token, res.user);
      navigate("/landing");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Google signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card auth-card--tall">

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
                {errors[id] && (
                  <p className="form-error">{errors[id]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <div className="form-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="btn-google"
              onClick={handleGoogle}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt=""
                width={18}
                height={18}
              />
              Continue with Google
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch__link">
              Log In
            </Link>
          </p>

          <span className="leaf-decor" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
