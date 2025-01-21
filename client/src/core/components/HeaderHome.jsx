import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderHome() {
  const navigate = useNavigate();
  return (
    <header className="header-user">
      <Container className="d-flex gap-5 justify-content-between align-items-center">
        <div className="d-none d-sm-block">
          <img className="user-select-none" src="/olympicslogo.png" alt="" />
        </div>
        <nav className="d-flex justify-content-center w-75 justify-content-sm-between align-content-center py-4">
          <div className="d-flex w-100 justify-content-evenly align-items-center gap-2 custom-shadow p-3">
            <article className="d-flex justify-content-between align-items-center gap-4">
              <Link to="/" className="link-hover">
                Inicio
              </Link>
              <Link to="/" className="link-hover">
                Sobre nosotros
              </Link>
              <Link to="/" className="link-hover">
                Misión
              </Link>
              <Link to="/" className="link-hover">
                Contacto
              </Link>
            </article>
            <article className="d-flex justify-content-between align-items-center gap-2">
              <ButtonCustom
                onClick={() => navigate("/user/register")}
                bgColor={"white"}
              >
                Regístrate
              </ButtonCustom>
              <ButtonCustom
                onClick={() => navigate("/user/login")}
                bgColor={"orange"}
              >
                Accede
              </ButtonCustom>
            </article>
          </div>
        </nav>
      </Container>
    </header>
  );
}
