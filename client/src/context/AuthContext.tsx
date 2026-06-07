// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types/User";

/* ─── TYPES ─── */
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
}

/* ─── CREATE CONTEXT ─── */
const AuthContext = createContext<AuthContextType | null>(null);

/* ─── PROVIDER ─── */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  /* Keep localStorage in sync whenever user or token changes */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  /* Called after successful login or register */
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };

  /* Called on logout */
  const logout = () => {
    setToken(null);
    setUser(null);
    // remove auth keys only to avoid clearing unrelated app state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  /* Called after profile update or avatar upload */
  const updateUser = (partial: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...partial } : prev);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ─── HOOK ─── */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};