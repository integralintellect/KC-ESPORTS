import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import api from "../api/api";
import logo from "../assets/kc_png.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "kc_admin_token",
        response.data.token
      );

      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);

      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-kc-bg px-5 py-10">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-[35%] h-72 w-72 -translate-x-1/2 rounded-full bg-kc-blue/10 blur-[120px]" />

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <img
            src={logo}
            alt="KC Esports"
            className="h-20 w-auto object-contain"
          />

          <div>
            <p className="font-heading text-[22px] font-bold leading-none text-kc-white">
              KC
            </p>

            <p className="font-heading text-[22px] font-bold leading-none text-kc-blue">
              ESPORTS
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="mt-8 border border-kc-border bg-kc-card/80 p-5 backdrop-blur-xl">

          <div className="text-center">
            <p className="font-heading text-[9px] font-semibold tracking-[0.3em] text-kc-blue">
              RESTRICTED ACCESS
            </p>

            <h1 className="mt-2 font-heading text-[30px] font-bold uppercase text-kc-white">
              Admin Login
            </h1>

            <p className="mt-2 text-[11px] text-kc-muted">
              Enter the Shark Den.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-7"
          >
            {/* Username */}
            <div>
              <label className="font-heading text-[9px] tracking-[0.2em] text-kc-muted">
                USERNAME
              </label>

              <div className="mt-2 flex items-center border border-kc-border bg-kc-bg">
                <div className="flex h-12 w-12 items-center justify-center text-kc-muted">
                  <User size={17} />
                </div>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  autoComplete="username"
                  className="h-12 min-w-0 flex-1 bg-transparent pr-4 text-[13px] text-kc-white outline-none placeholder:text-kc-muted/40"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="font-heading text-[9px] tracking-[0.2em] text-kc-muted">
                PASSWORD
              </label>

              <div className="mt-2 flex items-center border border-kc-border bg-kc-bg">
                <div className="flex h-12 w-12 items-center justify-center text-kc-muted">
                  <Lock size={17} />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="h-12 min-w-0 flex-1 bg-transparent text-[13px] text-kc-white outline-none placeholder:text-kc-muted/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="flex h-12 w-12 items-center justify-center text-kc-muted"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 border border-red-500/20 bg-red-500/5 px-3 py-3">
                <p className="text-center text-[11px] text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center bg-kc-blue font-heading text-[11px] font-bold tracking-[0.2em] text-kc-bg transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading
                ? "ENTERING..."
                : "ENTER ADMIN PANEL"}
            </button>
          </form>
        </div>

        {/* Back Home */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 w-full text-center font-heading text-[9px] tracking-[0.2em] text-kc-muted cursor-pointer"
        >
          ← BACK TO KC ESPORTS
        </button>

      </div>
    </main>
  );
}

export default AdminLogin;