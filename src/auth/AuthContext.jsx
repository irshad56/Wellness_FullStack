// // // // import { createContext, useContext, useState } from "react";

// // // // const AuthContext = createContext();

// // // // export const AuthProvider = ({ children }) => {
// // // //   const [user, setUser] = useState(null);

// // // //   const login = (email, password) => {
// // // //     // Fake backend
// // // //     if (email && password) {
// // // //       setUser({ email });
// // // //       return true;
// // // //     }
// // // //     return false;
// // // //   };

// // // //   const signup = (email, password) => {
// // // //     if (email && password) {
// // // //       setUser({ email });
// // // //       return true;
// // // //     }
// // // //     return false;
// // // //   };

// // // //   const logout = () => {
// // // //     setUser(null);
// // // //   };

// // // //   const resetPassword = (email) => {
// // // //     return email ? true : false;
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={{ user, login, signup, logout, resetPassword }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };

// // // // export const useAuth = () => useContext(AuthContext);


// // // import { createContext, useContext, useState, useMemo, useEffect } from "react";

// // // // 1. Create the Context
// // // const AuthContext = createContext();

// // // // Define a placeholder for the user object in session storage (for this example)
// // // const STORAGE_KEY = 'userSession';

// // // export const AuthProvider = ({ children }) => {
// // //   // States
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true); // Tracks if initial session check is complete

// // //   // 2. Initial Session Check (Simulates checking localStorage or calling an API)
// // //   useEffect(() => {
// // //     // 
// // //     try {
// // //       // 💡 In a real app, you would verify a token with your backend here.
// // //       // For this example, we check local storage.
// // //       const storedUser = localStorage.getItem(STORAGE_KEY);
// // //       if (storedUser) {
// // //         setUser(JSON.parse(storedUser));
// // //       }
// // //     } catch (error) {
// // //       console.error("Error retrieving user from storage:", error);
// // //       localStorage.removeItem(STORAGE_KEY);
// // //     } finally {
// // //       setLoading(false); // Authentication check is finished
// // //     }
// // //   }, []); // Runs only once on mount

// // //   // 3. Authentication Functions (using async/await for real-world API simulation)

// // //   const login = async (email, password) => {
// // //     // Simulate a network delay
// // //     await new Promise(resolve => setTimeout(resolve, 500));

// // //     if (!email || !password) {
// // //       return { success: false, message: "Please enter both email and password." };
// // //     }

// // //     // Fake backend logic:
// // //     if (email === "test@example.com" && password === "password123") {
// // //       const userData = { email };
// // //       setUser(userData);
// // //       localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
// // //       return { success: true };
// // //     } else {
// // //       return { success: false, message: "Invalid email or password." };
// // //     }
// // //   };

// // //   const signup = async (email, password) => {
// // //     await new Promise(resolve => setTimeout(resolve, 500));

// // //     if (email && password) {
// // //       const userData = { email };
// // //       setUser(userData);
// // //       localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
// // //       return { success: true };
// // //     }
// // //     return { success: false, message: "Signup failed. Please try again." };
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     localStorage.removeItem(STORAGE_KEY);
// // //   };

// // //   const resetPassword = (email) => {
// // //     // In a real app, this would call an API to send a reset link
// // //     return email
// // //       ? { success: true, message: "Password reset link sent to your email." }
// // //       : { success: false, message: "Please provide an email address." };
// // //   };

// // //   // 4. Memoize the context value for performance
// // //   const contextValue = useMemo(
// // //     () => ({
// // //       user,
// // //       loading,
// // //       login,
// // //       signup,
// // //       logout,
// // //       resetPassword,
// // //       isAuthenticated: !!user, // Convenience helper
// // //     }),
// // //     [user, loading]
// // //   );

// // //   // 5. Render Provider
// // //   return (
// // //     <AuthContext.Provider value={contextValue}>
// // //       {/* Optional: Render a loading indicator while session check is running */}
// // //       {loading ? <div>Authenticating session...</div> : children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // // 6. Custom hook to consume the context
// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (context === undefined) {
// // //     throw new Error('useAuth must be used within an AuthProvider');
// // //   }
// // //   return context;
// // // };





// // // src/auth/AuthContext.jsx

// // import { createContext, useContext, useState, useMemo, useEffect } from "react";

// // const AuthContext = createContext();
// // const STORAGE_KEY = 'userSession';

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Tracks if the user has completed their initial profile setup
// //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// //   useEffect(() => {
// //     // Logic to check local storage and restore user/completeness status
// //     try {
// //       const storedData = localStorage.getItem(STORAGE_KEY);
// //       if (storedData) {
// //         const data = JSON.parse(storedData);
// //         setUser(data.user);
// //         setIsProfileComplete(data.isComplete || false);
// //       }
// //     } catch (error) {
// //       console.error("Error retrieving user data:", error);
// //       localStorage.removeItem(STORAGE_KEY);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const login = async (email, password) => {
// //     // Simulated login logic
// //     if (email === "test@example.com" && password === "password123") {
// //       const userData = { email };
// //       const completeStatus = email.includes('complete');
// //       setUser(userData);
// //       setIsProfileComplete(completeStatus);

// //       localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData, isComplete: completeStatus }));
// //       return { success: true };
// //     }
// //     return { success: false, message: "Invalid credentials." };
// //   };

// //   const markProfileAsComplete = () => {
// //     // Logic to update state and local storage when the dashboard setup is finished
// //     setIsProfileComplete(true);

// //     const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
// //     localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...storedData, isComplete: true }));
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     setIsProfileComplete(false);
// //     localStorage.removeItem(STORAGE_KEY);
// //   };

// //   const contextValue = useMemo(
// //     () => ({
// //       user,
// //       loading,
// //       login,
// //       logout,
// //       isProfileComplete,
// //       markProfileAsComplete,
// //       isAuthenticated: !!user,
// //     }),
// //     [user, loading, isProfileComplete]
// //   );

// //   return (
// //     <AuthContext.Provider value={contextValue}>
// //       {loading ? <div>Authenticating session...</div> : children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };













// import { createContext, useContext, useEffect, useState } from "react";
// import usersData from "../data/users.json";

// // Utility to save JSON back to localStorage (since Vite cannot write file directly)
// const saveUsers = (users) => {
//   localStorage.setItem("wellness_users", JSON.stringify(users));
// };

// const loadUsers = () => {
//   const stored = localStorage.getItem("wellness_users");
//   return stored ? JSON.parse(stored) : usersData;
// };

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [users, setUsers] = useState(loadUsers());
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );

//   // Sync user database
//   useEffect(() => {
//     saveUsers(users);
//   }, [users]);

//   // Sync logged in user
//   useEffect(() => {
//     if (currentUser)
//       localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     else localStorage.removeItem("currentUser");
//   }, [currentUser]);

//   // --------------------------
//   // SIGNUP FUNCTION
//   // --------------------------
//   const signup = async (newUser) => {
//     const exists = users.find((u) => u.email === newUser.email);

//     if (exists) throw new Error("Email already registered.");

//     const userObj = {
//       ...newUser,
//       failedAttempts: 0,
//     };

//     setUsers([...users, userObj]);
//     return true;
//   };

//   // --------------------------
//   // LOGIN FUNCTION
//   // --------------------------
//   const login = async (email, password) => {
//     const user = users.find((u) => u.email === email);

//     if (!user) {
//       throw new Error("Email not registered, please signup first.");
//     }

//     // Check attempts
//     if (user.failedAttempts >= 10) {
//       throw new Error(
//         "Too many failed attempts. Please use Forgot Password option."
//       );
//     }

//     // Password check
//     if (user.password !== password) {
//       const updatedUsers = users.map((u) =>
//         u.email === email ? { ...u, failedAttempts: u.failedAttempts + 1 } : u
//       );
//       setUsers(updatedUsers);
//       throw new Error(
//         `Incorrect password. ${9 - user.failedAttempts} attempts left.`
//       );
//     }

//     // Successful login
//     const updatedUsers = users.map((u) =>
//       u.email === email ? { ...u, failedAttempts: 0 } : u
//     );
//     setUsers(updatedUsers);
//     setCurrentUser(user);
//     return true;
//   };

//   // --------------------------
//   // RESET PASSWORD FUNCTION
//   // --------------------------
//   const resetPassword = async (email) => {
//     const user = users.find((u) => u.email === email);
//     if (!user) return false;

//     const newPassword = "wellness123"; // default reset password

//     const updated = users.map((u) =>
//       u.email === email
//         ? { ...u, password: newPassword, failedAttempts: 0 }
//         : u
//     );

//     setUsers(updated);
//     return true;
//   };

//   // --------------------------
//   // LOGOUT
//   // --------------------------
//   const logout = () => setCurrentUser(null);

//   return (
//     <AuthContext.Provider value={{ currentUser, signup, login, resetPassword, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);







import { createContext, useContext, useEffect, useState } from "react";
import usersData from "../data/users.json";
import api from "../utils/api";


// Persist users to localStorage (browser-side DB)
const USERS_KEY = "wellness_users_v1";
const CURRENT_KEY = "wellness_currentUser_v1";

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const loadUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : usersData || [];
};

const saveCurrent = (user) => {
  if (user) localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_KEY);
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers());
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem(CURRENT_KEY)) || null
  );

  // Sync user database
  useEffect(() => {
    saveUsers(users);
  }, [users]);

  // Sync current user
  useEffect(() => {
    saveCurrent(currentUser);
  }, [currentUser]);

  // Helper: find user by email
  const findUser = (email) => users.find((u) => u.email === email);

  // --------------------------
  // SIGNUP
  // --------------------------
  // newUser shape: { name, email, password, role }
  const signup = async ({ name, email, password, role }) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role: role.toUpperCase(), // IMPORTANT
      bio: "",                  // TEMP (until profile step)
    });

    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Signup failed"
    );
  }
};



  // --------------------------
  // LOGIN
  // --------------------------
  // returns the user object on success
  const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    
    // backend returns: { accessToken, refreshToken, user: {...} }
    const { accessToken, refreshToken, user } = response.data;

    // Save tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Update currentUser state
    setCurrentUser(user);

    return user; // same shape as before so Login.jsx still works
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Login failed, check credentials."
    );
  }
};


  // --------------------------
  // RESET PASSWORD
  // --------------------------
  const resetPassword = async (email) => {
    const user = findUser(email);
    if (!user) throw new Error("Email not found.");

    const newPassword = "wellness123"; // default reset password
    const updated = users.map((u) =>
      u.email === email ? { ...u, password: newPassword, failedAttempts: 0 } : u
    );
    setUsers(updated);

    // if the reset user is current user, update currentUser too
    if (currentUser && currentUser.email === email) {
      setCurrentUser({ ...currentUser, password: newPassword, failedAttempts: 0 });
    }

    // In a real app you'd email a reset link. Here we just return the new password.
    return newPassword;
  };

  // --------------------------
  // UPDATE PROFILE (onboarding completion)
  // profileData depends on role:
  // patient -> { bio }
  // practitioner -> { specialization, verified }
  // --------------------------
  const updateProfile = async (email, profileData) => {
    const user = findUser(email);
    if (!user) throw new Error("User not found.");

    const updated = users.map((u) =>
      u.email === email
        ? {
          ...u,
          profile: profileData,
          profileCompleted: true,
        }
        : u
    );
    setUsers(updated);

    // update currentUser if it matches
    if (currentUser && currentUser.email === email) {
      setCurrentUser({
        ...currentUser,
        profile: profileData,
        profileCompleted: true,
      });
    }

    return true;
  };

  // --------------------------
  // LOGOUT
  // --------------------------
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        signup,
        login,
        resetPassword,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);