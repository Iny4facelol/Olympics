import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import HeaderDashboard from "../components/HeaderDashboard";
import { useAppContext } from "../context/AppContext";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
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
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <>
      <HeaderDashboard
        className={`dashboard-header theme-transition
          ${theme === "light" ? "light-mode" : "dark-mode"}
          ${isTransitioning ? "transitioning" : ""}`}
        lightDarkHandler={toggleTheme}
      />
      <main
        className={`main-admin py-5 theme-transition flex-grow-1 custom-container
          ${theme === "light" ? "light-mode" : "dark-mode"}
          ${isTransitioning ? "transitioning" : ""}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
