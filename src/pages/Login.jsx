import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      // If profileCompleted -> existing user (direct to home)
      // else -> new user (go to dashboard to complete profile)
      if (user.profileCompleted) {
        navigate("/home");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Starting ${provider} authentication flow...`);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE FORM */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-blue-200">
        <div className="w-full max-w-lg lg:w-[80%] border-4 border-teal-400/70 shadow-2xl rounded-xl p-8 lg:p-10 bg-white/95 backdrop-blur-sm space-y-7">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Login to Wellness 🧘‍♀️
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your path to balance starts here.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                {/* SVG paths kept same */}
              </svg>
              <span className="text-slate-700 text-sm font-medium">Continue with Google</span>
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or sign in with email</span>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-teal-600 hover:text-teal-800 font-medium">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-bold shadow-md transition duration-200 
                ${loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transform hover:-translate-y-0.5"
                }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center pt-2 text-sm">
            <p className="text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-teal-600 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:block lg:w-3/5 relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1920&auto=format&fit=crop"
          alt="Wellness and Meditation"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Wellness Marketplace For Alternate Therapies
          </h2>
          <p className="text-lg text-teal-50 opacity-90">
            “Well-being is more than care — it’s a mindful lifestyle shaped by the
            wisdom of your body, the clarity of your mind, and the peace of your spirit.”
          </p>
        </div>
      </div>
    </div>
  );
}