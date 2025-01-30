import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HeaderDashboard() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {logout, themeSwitcher} = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <header className="dashboard-header">
      <Container>
        <nav className="d-flex justify-content-center justify-content-sm-between align-content-center py-4">
          <article className="d-none d-sm-block user-select-none">
            <img className="user-select-none " src={themeSwitcher ? "/olympicslogo.png" : "/logodark.png"} alt="" />
          </article>
          <article className="d-flex justify-content-between align-items-center gap-2">
            <ButtonCustom onClick={() => navigate(-1)} bgColor={"white"}>
              {t("header.back")}
            </ButtonCustom>
            <ButtonCustom onClick={handleLogout} bgColor={"orange"}>
              {t("header.logout")}
            </ButtonCustom>
             <LanguageSwitcher />
          </article>
        </nav>
      </Container>
    </header>
  );
}
