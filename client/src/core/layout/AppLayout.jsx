import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import "./AppLayout.css";
import { useAppContext } from "../context/AppContext";

export default function AppLayout({ children }) {
  const { themeSwitcher, setThemeSwitcher } = useAppContext();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIcon = () => {
    setThemeSwitcher(!themeSwitcher);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
    localStorage.setItem("themeSwitcher", String(themeSwitcher));
  }, [theme, themeSwitcher]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    handleIcon();

    // Remove transitioning class after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };


 return (
    <>
      <header 
        className={`header-user theme-transition
          ${theme === "light" ? "light-mode" : "dark-mode"}
          ${isTransitioning ? "transitioning" : ""}`}
      >
        <HeaderHome
          lightDarkHandler={toggleTheme}
          theme={theme}
        />
      </header>
      <main
        className={`main-user theme-transition flex-grow-1 flex-column custom-container
          ${theme === "light" ? "light-mode" : "dark-mode"}
          ${isTransitioning ? "transitioning" : ""}`}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}

