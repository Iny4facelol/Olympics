import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";
import { useNavigate } from "react-router-dom";

export default function HeaderHome() {
  const navigate = useNavigate()
  return (
    <header className="header-user">
      <Container>
        <nav className="d-flex justify-content-between align-content-center py-4">
          <article className="">
            <img className="user-select-none" src="/olympicslogo.png" alt="" />
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
        </nav>
      </Container>
    </header>
  );
}
