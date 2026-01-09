// // // import { Navigate } from "react-router-dom";
// // // import { useAuth } from "./AuthContext";

// // // export default function ProtectedRoute({ children }) {
// // //   const { user } = useAuth();

// // //   if (!user) return <Navigate to="/login" replace />;

// // //   return children;
// // // }


// // // src/components/ProtectedRoute.jsx

// // import React from 'react';
// // import { Navigate, Outlet } from 'react-router-dom';
// // import { useAuth } from './AuthContext';

// // // requiredComplete: true for /home, false for /dashboard
// // export function ProtectedRoute({ requiredComplete = false }) {
// //   const { user, isProfileComplete } = useAuth();

// //   // 1. Not authenticated? Go to Login.
// //   if (!user) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   // 2. Accessing /home (requiredComplete=true) but profile is incomplete? Go to Dashboard.
// //   if (requiredComplete && !isProfileComplete) {
// //     return <Navigate to="/dashboard" replace />;
// //   }

// //   // 3. Accessing /dashboard (requiredComplete=false) but profile IS complete? Go to Home.
// //   if (!requiredComplete && isProfileComplete) {
// //     return <Navigate to="/home" replace />;
// //   }

// //   // 4. All checks passed. Render the page.
// //   return <Outlet />;
// // }



// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// }




// src/auth/ProtectedRoute.jsx (If you are using the simpler component)
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) { // 👈 Use default
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}