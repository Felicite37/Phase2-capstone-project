"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "publishhub_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch {
        // ignore parse errors
      }
    }
    setLoading(false);
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const fakeNetwork = (delay = 600) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const login = async (email: string, password: string) => {
    setLoading(true);
    await fakeNetwork();
    // Simple mock: accept any non-empty values
    if (!email || !password) {
      setLoading(false);
      throw new Error("Email and password are required");
    }
    persistUser({
      id: "1",
      name: email.split("@")[0] || "User",
      email,
    });
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    await fakeNetwork();
    if (!name || !email || !password) {
      setLoading(false);
      throw new Error("All fields are required");
    }
    // In a real app, you would call your API here.
    persistUser({
      id: "1",
      name,
      email,
    });
    setLoading(false);
  };

  const logout = () => {
    persistUser(null);
  };

  const value: AuthContextValue = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
