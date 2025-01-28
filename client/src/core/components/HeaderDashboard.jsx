import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function HeaderDashboard() {
  const navigate = useNavigate();
  const {logout} = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <header className="dashboard-header">
      <Container>
        <nav className="d-flex justify-content-center justify-content-sm-between align-content-center py-4">
          <article className="d-none d-sm-block user-select-none">
            <img className="user-select-none " src="/olympicslogo.png" alt="" />
          </article>
          <article className="d-flex justify-content-between align-items-center gap-2">
            <ButtonCustom onClick={() => navigate(-1)} bgColor={"white"}>
              Volver atrás
            </ButtonCustom>
            <ButtonCustom onClick={handleLogout} bgColor={"orange"}>
              Cerrar sesión
            </ButtonCustom>
          </article>
        </nav>
      </Container>
    </header>
  );
}
