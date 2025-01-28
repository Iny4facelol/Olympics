import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [icon, setIcon] = useState(false);

  const handleIcon = () => {
    setIcon(!icon);
  }

  useEffect(() => {
    document.documentElement.className = theme; 
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    handleIcon();
  };
  return (
    <>
      <HeaderHome lightDarkHandler={toggleTheme} theme={theme} icon={icon} />
      <main className="main-user flex-grow-1 flex-column custom-container">
        {children}
      </main>
      <Footer />
    </>
  );
}
