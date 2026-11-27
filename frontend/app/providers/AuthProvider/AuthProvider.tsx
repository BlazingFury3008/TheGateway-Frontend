"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextProps, AuthenticationLevel, UserData } from "./lib";

export const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authenticated, setAuthenticated] =
    useState<AuthenticationLevel>("unauthenticated");

  const fetch_me = async () => {
    try {
      setAuthenticated("loading");
      const res = await fetch("/api/credentials/me")

      if (!res.ok) {
        setAuthenticated("unauthenticated");
        return;
      }

      const data = await res.json();

      setUserData(data);
      setAuthenticated("authenticated");
    } catch (error) {
      alert(JSON.stringify(error));
      setAuthenticated("unauthenticated");
    }
  };

  useEffect(() => {
    fetch_me();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData: userData, authenticated: authenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
