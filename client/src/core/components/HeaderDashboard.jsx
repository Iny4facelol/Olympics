import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { Moon, Sun } from "lucide-react";

export default function HeaderDashboard({ lightDarkHandler }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, themeSwitcher } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBack = () => {
    if (location.pathname === "/admin/dashboard" || location.pathname === "/user/dashboard" || location.pathname === "/user/res_dashboard") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="dashboard-header">
      <Container>
        <nav className="d-flex justify-content-center justify-content-sm-between align-content-center py-4">
          <article className="d-none d-sm-block user-select-none">
            <img
              className="user-select-none "
              src={themeSwitcher ? "/olympicslogo.png" : "/logodark.png"}
              alt=""
            />
          </article>
          <article className="d-flex justify-content-between align-items-center gap-2">
            <ButtonCustom
              onClick={handleBack}
              bgColor={themeSwitcher ? "white" : "dark"}
            >
              {t("header.back")}
            </ButtonCustom>
            <ButtonCustom onClick={handleLogout} bgColor={"orange"}>
              {t("header.logout")}
            </ButtonCustom>
            <ButtonCustom
              onClick={lightDarkHandler}
              bgColor={themeSwitcher ? "white" : "dark"}
            >
              {themeSwitcher ? <Moon /> : <Sun />}
            </ButtonCustom>
            <LanguageSwitcher />
          </article>
        </nav>
      </Container>
    </header>
  );
}
