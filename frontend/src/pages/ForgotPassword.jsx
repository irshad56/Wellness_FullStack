import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const newPassword = await resetPassword(email);
      // show success message + redirect to login
      setMessage(`Password reset. Use: ${newPassword} to login.`);
      // redirect to login (existing flow: forgot -> login -> home)
      navigate("/login");
    } catch (err) {
      setError(err.message || "Could not send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* ... same UI as before */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 to-blue-200">
        <div className="w-full max-w-lg lg:w-[80%] border-4 border-teal-400/70 shadow-2xl rounded-xl p-6 lg:p-8 bg-white/95 backdrop-blur-sm space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Trouble Signing In? 🤔
            </h2>
            <p className="text-sm text-slate-500">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div className="p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="p-2 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
              {message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleReset}>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition duration-200 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || message}
              className={`w-full py-2.5 px-3 rounded-lg text-white font-bold shadow-md transition duration-200 
                ${loading || message
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transform hover:-translate-y-0.5"
                }`}
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center pt-1">
            <Link to="/login" className="text-teal-600 font-bold hover:underline text-sm">
              ← Back to Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* right image section unchanged */}
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