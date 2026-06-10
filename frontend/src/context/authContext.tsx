import { useState, type ReactNode } from "react";
import { AuthContext } from "../constants/commonConstants";
import { type User } from "../types/authTypes";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = sessionStorage.getItem("user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const setToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  const setUserHandler = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUserHandler = () => {
    // prefer state but fall back to sessionStorage if needed
    if (user) return user;
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setToken,
    setUserHandler,
    getUserHandler,
    logout,
    isAuthenticated: !!user,
  };

  console.log(user, "value");

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
