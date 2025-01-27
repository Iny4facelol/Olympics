import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (token) {
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
    }
  }, [token, rememberMe]);

  useEffect(() => {
    if (user) {
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [user, rememberMe]);

  useEffect(() => {
    const storedUser = rememberMe
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");
    const storedToken = rememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, [rememberMe]);

  const logout = () => {
    setToken(null);
    setUser(null);
    if (rememberMe) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        rememberMe,
        setRememberMe,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
