import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newUser = await signup({ name, email, password, role });
      // After signup we go to dashboard for onboarding (new-user flow)
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Starting ${provider} authentication flow...`);
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 to-blue-200">
        <div className="w-full max-w-lg border-4 border-teal-400/70 shadow-2xl rounded-xl 
                        p-6 lg:p-8 bg-white/95 backdrop-blur-sm space-y-5
                        max-h-[95vh] lg:max-h-[90vh]">

          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Create Your Wellness Account 🌱
            </h2>
            <p className="text-sm text-slate-500">
              Tell us a bit about your role in the wellness community.
            </p>
          </div>

          {error && (
            <div className="p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSocialSignup("Google")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 
                         border border-slate-300 rounded-lg bg-white hover:bg-slate-50
                         transition duration-200"
            >
              {/* svg omitted for brevity (keeps UI same) */}
              <span className="text-slate-700 text-sm font-medium">
                Continue with Google
              </span>
            </button>

            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or sign up with details</span>
              </div>
            </div>
          </div>

          <form className="space-y-3" onSubmit={handleSignup}>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-1 focus:ring-teal-400 outline-none"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-1 focus:ring-teal-400 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-1 focus:ring-teal-400 outline-none"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Role</label>
              <select
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-1 focus:ring-teal-400 outline-none appearance-none cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="practitioner">Practitioner</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-3 rounded-lg text-white font-bold shadow-md transition 
                ${loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"}
              `}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600 font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>

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