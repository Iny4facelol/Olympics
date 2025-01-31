import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Moon, Sun } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function HeaderHome({ lightDarkHandler }) {
  const { user, setUser, setToken, themeSwitcher } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const handleNavToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigate = () => {
    if (user?.user_type === 1) {
      navigate("/admin/dashboard");
    } else if (user?.user_type === 2) {
      navigate("/user/res_dashboard");
    } else if (user?.user_type === 3) {
      navigate("/user/dashboard");
    } else {
      navigate("/user/register");
    }
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      navigate("/");
    } else {
      navigate("/user/login");
    }
  };

  return (
    <header className="header-user">
      <Container className="d-flex gap-5 py-4 justify-content-center justify-content-sm-between align-items-center flex-column flex-sm-row">
        <div className="user-select-none">
          <img
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="user-select-none"
            src={themeSwitcher ? "/olympicslogo.png" : "/logodark.png"}
            alt=""
          />
        </div>
        <nav className="d-flex justify-content-center w-sm-75 w-100 justify-content-sm-between align-content-center py-0 py-sm-4 home-nav">
          <div className="d-flex w-100 justify-content-center justify-content-sm-evenly align-items-center gap-2 custom-shadow p-3 rounded-4">
            <article className="d-flex justify-content-between align-items-center gap-4 user-select-none d-none d-xl-flex">
              <Link
                to="/"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="link-hover fw-semibold"
              >
                {t("header.home")}
              </Link>
              <a
                href="#aboutUs"
                onClick={() => handleNavToSection("aboutUs")}
                className="link-hover fw-semibold "
              >
                {t("header.aboutUs")}
              </a>
              <a
                href="#valours"
                onClick={() => handleNavToSection("values")}
                className="link-hover fw-semibold"
              >
                {t("header.values")}
              </a>
              <a
                href="#contact"
                onClick={() => handleNavToSection("contact")}
                className="link-hover fw-semibold"
              >
                {t("header.contact")}
              </a>
            </article>
            <article className="d-flex justify-content-between align-items-center gap-2">
              <ButtonCustom
                onClick={handleNavigate}
                bgColor={themeSwitcher ? "white" : "dark"}
              >
                {user ? t("header.goToProfile") : t("header.signUp")}
              </ButtonCustom>
              <ButtonCustom onClick={handleLogout} bgColor={"orange"}>
                {user ? t("header.logout") : t("header.login")}
              </ButtonCustom>
              <ButtonCustom
                onClick={lightDarkHandler}
                bgColor={themeSwitcher ? "white" : "dark"}
              >
                {themeSwitcher ? <Moon /> : <Sun />}
              </ButtonCustom>
              <LanguageSwitcher />
            </article>
          </div>
        </nav>
      </Container>
    </header>
  );
}
