import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Auto-fetch current user on load
  useEffect(() => {
    fetchUser();
  }, []);
  
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/me", {
        credentials: "include",
      });

      if (!res.ok) {
        // If not authenticated or error occurred, just set user to null
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null); // Ensure user is set to null if error happens
    } finally {
      setIsLoading(false); // Loading ends either way
    }
  };

  // ✅ Signup
  const signup = async ({ name, email, password, passwordConfirm }) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });

      if (!res.ok) {
        let error;
        try {
          error = await res.json();
        } catch {
          throw new Error("Signup failed");
        }
        throw new Error(error.message || "Signup failed");
      }

      const data = await res.json();
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false)
    }
  };

  // ✅ Login
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) throw new Error("Invalid email or password");
      const loginData = await res.json();
  
      // ✅ Fetch actual user data from /me
      const userRes = await fetch("http://localhost:8000/api/users/me", {
        credentials: "include",
      });
  
      if (!userRes.ok) throw new Error("Could not fetch user");
      const userData = await userRes.json();

  
      setUser(userData); // This updates the context
      return loginData;  // Or return userData if you prefer
    } catch (err) {
      throw err;
    }
  };
  

  // ✅ Logout
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
        credentials: "include"
      });
  
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Logout failed");
      }
  
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  
  const isAdmin = user?.role === "admin";
  const isShipper = user?.role === "shipper";
  const isCarrier = user?.role === "carrier";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        login,
        logout,
        isAdmin,
        isShipper,
        isCarrier,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
