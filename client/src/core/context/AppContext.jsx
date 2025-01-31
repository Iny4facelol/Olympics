import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [themeSwitcher, setThemeSwitcher] = useState(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    return storedTheme === "light";
  });

  const [token, setToken] = useState(() => {
    // Inicialización con lazy loading
    const rememberedState = localStorage.getItem("rememberMe") === "true";
    const storage = rememberedState ? localStorage : sessionStorage;
    return storage.getItem("token") || null;
  });

  const [user, setUser] = useState(() => {
    const rememberedState = localStorage.getItem("rememberMe") === "true";
    const storage = rememberedState ? localStorage : sessionStorage;
    const storedUser = storage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

  // Efecto para manejar el cambio de rememberMe
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);

    // Si cambiamos rememberMe, transferimos los datos al storage correspondiente
    if (token || user) {
      const oldStorage = rememberMe ? sessionStorage : localStorage;
      const newStorage = rememberMe ? localStorage : sessionStorage;

      // Transferir token
      if (token) {
        newStorage.setItem("token", token);
        oldStorage.removeItem("token");
      }

      // Transferir user
      if (user) {
        newStorage.setItem("user", JSON.stringify(user));
        oldStorage.removeItem("user");
      }
    }
  }, [rememberMe]);

  // Efecto para actualizar token en storage
  useEffect(() => {
    if (token) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);
    }
  }, [token, rememberMe]);

  // Efecto para actualizar user en storage
  useEffect(() => {
    if (user) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(user));
    }
  }, [user, rememberMe]);

  useEffect(() => {
    const theme = themeSwitcher ? "light" : "dark";
    localStorage.setItem("theme", theme);
    localStorage.setItem("themeSwitcher", themeSwitcher);
    document.documentElement.className = theme;
  }, [themeSwitcher]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
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
        themeSwitcher,
        setThemeSwitcher,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
