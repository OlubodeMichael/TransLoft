import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Auto-fetch current user on load
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await fetch("http://localhost:8000/api/users/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          //console.log(data)
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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

      if (!res.ok) {
        let error;
        try {
          error = await res.json();
        } catch {
          throw new Error("Login failed");
        }
        throw new Error(error.message || "Login failed");
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
  

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        login,
        logout
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
