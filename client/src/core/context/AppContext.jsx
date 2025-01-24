import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (rememberMe) {
      if (token) {
        localStorage.setItem("token", token);
      }
    }
  }, [token]);

  useEffect(() => {
    if (rememberMe) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser , rememberMe, setRememberMe}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
