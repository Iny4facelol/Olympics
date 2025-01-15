import { createContext, useContext } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ }}>
      {children}
    </AppContext.Provider>
    );  
};

export const useAppContext = () => {
  return useContext(AppContext);
};
