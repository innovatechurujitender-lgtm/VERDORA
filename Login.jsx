import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/png-removebg-preview_1779963000572.png";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Mock login - assigning a role based on email for testing if needed, 
      // but usually we'd get this from backend. 
      // For now, let's default to buyer unless it's a specific "supplier@verdora.com"
      const role = form.email.includes("supplier") ? "supplier" : "buyer";
      login(form.email, role, "User");
      setLoading(false);
      setLocation("/");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,205,50,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(50,205,50,0.06),transparent_45%)]" />

      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <img src={logoPath} alt="VERDORA" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-linear-to-br from-primary to-emerald-400 bg-clip-text text-transparent">
                VERDORA
              </span>
            </Link>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-center text-foreground mb-1">Welcome back</h1>
          <p className="text-center text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8">
            Sign in to your VERDORA account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@company.com"
                data-testid="input-email"
                className="w-full bg-secondary/50 border border-border focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <button type="button" className="text-xs text-primary hover:text-emerald-400 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter your password"
                  data-testid="input-password"
                  className="w-full bg-secondary/50 border border-border focus:border-primary rounded-xl px-4 py-3 pr-11 outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              data-testid="button-login"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(50,205,50,0.25)] transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/60 backdrop-blur-xl px-3 text-muted-foreground">or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => {
              login("google.user@verdora.com", "buyer", "Google User");
              setLocation("/");
            }}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl h-12 text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-emerald-400 font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to VERDORA's{" "}
              <span className="text-primary cursor-pointer hover:underline">Terms</span> &{" "}
              <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
