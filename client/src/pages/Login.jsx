import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, Zap, AlertCircle, Loader2 } from "lucide-react";
import AnimatedLogo from "../components/AnimatedLogo";

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(0, 102, 255, 0.3); }
    50% { box-shadow: 0 0 40px rgba(0, 102, 255, 0.5); }
  }
`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    document.title = "ExpenseIQ | Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0A2540 0%, #0D2B4A 30%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(0, 102, 255, 0.3)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Background Glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "glow 4s ease-in-out infinite",
          }}
        />

        {/* Auth Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "32px",
            padding: "48px 40px",
            width: "100%",
            maxWidth: "440px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "fadeInUp 0.6s ease-out",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo */}
         <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
  <AnimatedLogo size={64} showText={false} />
</div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#0A2540",
              marginBottom: "8px",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              color: "#64748B",
              fontSize: "0.95rem",
              marginBottom: "32px",
              fontWeight: 500,
            }}
          >
            Login to continue tracking your finances.
          </p>

          {/* Error Box */}
          {error && (
            <div
              style={{
                background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
                color: "#DC2626",
                padding: "14px 16px",
                borderRadius: "16px",
                marginBottom: "20px",
                fontSize: "0.9rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                animation: "shake 0.4s ease",
                border: "1px solid rgba(220, 38, 38, 0.1)",
              }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Email Input */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: focusedField === "email" ? "#0066FF" : "#94A3B8",
                  transition: "all 0.3s ease",
                  zIndex: 2,
                }}
              >
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  borderRadius: "16px",
                  border: `2px solid ${focusedField === "email" ? "#0066FF" : "#E2E8F0"}`,
                  background: focusedField === "email" ? "white" : "#F8FAFC",
                  fontSize: "0.95rem",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0F172A",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: focusedField === "email" ? "0 0 0 4px rgba(0, 102, 255, 0.1), 0 4px 12px rgba(0, 102, 255, 0.08)" : "none",
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: focusedField === "password" ? "#0066FF" : "#94A3B8",
                  transition: "all 0.3s ease",
                  zIndex: 2,
                }}
              >
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 48px",
                  borderRadius: "16px",
                  border: `2px solid ${focusedField === "password" ? "#0066FF" : "#E2E8F0"}`,
                  background: focusedField === "password" ? "white" : "#F8FAFC",
                  fontSize: "0.95rem",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0F172A",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: focusedField === "password" ? "0 0 0 4px rgba(0, 102, 255, 0.1), 0 4px 12px rgba(0, 102, 255, 0.08)" : "none",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer",
                  padding: "4px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#0066FF")}
                onMouseLeave={(e) => (e.target.style.color = "#94A3B8")}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: loading
                  ? "#CBD5E1"
                  : "linear-gradient(135deg, #0066FF, #0052CC)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: loading
                  ? "none"
                  : "0 4px 16px rgba(0, 102, 255, 0.35)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.3px",
                marginTop: "8px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 24px rgba(0, 102, 255, 0.45)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = loading
                  ? "none"
                  : "0 4px 16px rgba(0, 102, 255, 0.35)";
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Switch Link */}
          <p
            style={{
              marginTop: "28px",
              fontSize: "0.9rem",
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            New user?{" "}
            <Link
              to="/register"
              style={{
                color: "#0066FF",
                textDecoration: "none",
                fontWeight: 700,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#0052CC";
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#0066FF";
                e.target.style.textDecoration = "none";
              }}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}