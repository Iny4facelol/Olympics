import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";

export default function HeaderHome() {
  return (
    <header className="header-user">
      <Container>
        <nav className="d-flex justify-content-between align-content-center py-4">
          <article className="">
            <img className="user-select-none" src="/olympicslogo.png" alt="" />
          </article>
          <article className="d-flex justify-content-between align-items-center gap-2">
            <ButtonCustom bgColor={"white"}>Regístrate</ButtonCustom>
            <ButtonCustom bgColor={"orange"}>Accede</ButtonCustom>
          </article>
        </nav>
      </Container>
    </header>
  );
}
