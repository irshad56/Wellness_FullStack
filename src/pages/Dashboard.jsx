import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

// Define the available practitioner specializations
const specializationsOptions = [
  "physiotherapy",
  "acupuncture",
  "ayurveda",
  "chiropractic",
];

export default function Dashboard() {
  const { currentUser, updateProfile } = useAuth(); // Functionality unchanged
  const navigate = useNavigate();

  // If no currentUser, redirect to login
  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const { name, email } = currentUser;
  const role = currentUser.role?.toUpperCase();


  // --- ORIGINAL STATE VARIABLES (Functionality Unchanged) ---
  // Using optional chaining and nullish coalescing for safety
  const [bio, setBio] = useState(currentUser.profile?.bio || "");
  const [specialization, setSpecialization] = useState(currentUser.profile?.specialization || specializationsOptions[0]);
  const [verified, setVerified] = useState(currentUser.profile?.verified ? "yes" : "no");

  // UI State for managing errors and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- ORIGINAL FUNCTIONALITY (Unchanged) ---
  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateProfile(email, { bio });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Could not save patient profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePractitionerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateProfile(email, {
        specialization,
        verified: verified === "yes",
      });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Could not save practitioner profile.");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW UI RETURN (Matching the 50/50 Login/Signup Style) ---
  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE FORM (40% Width for Form/Card) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-blue-200">

        {/* Profile Completion Form Card - Matches Login Card Style */}
        <form
          onSubmit={role === "PATIENT" ? handlePatientSubmit : handlePractitionerSubmit}
          className="w-full max-w-lg lg:w-[80%] 
                       border-4 border-teal-400/70 shadow-2xl rounded-xl 
                       p-6 lg:p-8 bg-white/95 backdrop-blur-sm space-y-6 
                       max-h-[90vh] overflow-y-auto" // Added max-h and scroll for small screens
        >

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Complete Your Profile 📝
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Welcome, **{name}** ({role.charAt(0).toUpperCase() + role.slice(1)}).
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {/* --- USER INFO SECTION --- */}
          <div className="flex flex-col gap-3">

            {/* Icon placeholder for profile */}
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 rounded-full bg-teal-100 border-3 border-teal-500 flex items-center justify-center text-2xl text-teal-600 shadow-lg">
                {role === 'PATIENT' ? '🧘' : '⚕️'}
              </div>
            </div>

            <hr className="border-t border-slate-200" />

            {/* Basic Info Inputs (Readonly based on existing user data) */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  className="w-full px-3 py-2 rounded-lg bg-slate-200 border border-slate-200 outline-none cursor-not-allowed" // Smaller inputs for a tighter look
                  value={name}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  readOnly
                  className="w-full px-3 py-2 rounded-lg bg-slate-200 border border-slate-200 outline-none cursor-not-allowed" // Smaller inputs
                  value={email}
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200" />

          {/* --- CONTENT BASED ON ROLE --- */}

          {role === "PATIENT" ? (
            /* PATIENT FORM */
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Tell Us About Your Goals (Optional, Max 500 characters)
              </label>
              <textarea
                name="bio"
                rows="3"
                maxLength="500"
                // Matching input style from Login/Signup:
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
                placeholder="I want to improve my sleep and energy levels..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1 text-right">
                {bio.length} / 500 characters
              </p>
            </div>
          ) : (
            /* PRACTITIONER FORM */
            <>
              {/* --- PRACTITIONER SPECIALTY RADIO BUTTONS --- */}
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 space-y-3">
                <label className="text-sm font-medium text-slate-700 block">Select Your Specialization:</label>
                <div className="grid grid-cols-2 gap-3">
                  {specializationsOptions.map((spec) => (
                    <label key={spec} className="flex items-center space-x-2 capitalize">
                      <input
                        type="radio"
                        name="specialization"
                        value={spec}
                        checked={specialization === spec}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="form-radio text-cyan-600 h-4 w-4"
                      />
                      <span className="text-sm text-slate-600">{spec.charAt(0).toUpperCase() + spec.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Verification Status</label>
                <select
                  value={verified}
                  onChange={(e) => setVerified(e.target.value)}
                  // Matching input style:
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  required
                >
                  <option value="no">No (Pending Review)</option>
                  <option value="yes">Yes (Verified)</option>
                </select>
              </div>
            </>
          )}

          {/* --- SUBMIT BUTTON (CENTERED) --- */}
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              disabled={loading}
              // Matching button style:
              className={`py-3 px-12 rounded-lg text-white font-bold shadow-md transition duration-200 
                        ${loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transform hover:-translate-y-0.5"
                }`}
            >
              {loading ? "Saving Profile..." : "Save & Continue"}
            </button>
          </div>

        </form>
      </div>

      {/* RIGHT SIDE IMAGE (60% Width) - Matches Login/Signup Image */}
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