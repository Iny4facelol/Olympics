import { Container } from "react-bootstrap";
import ButtonCustom from "./Button/Button";

export default function HeaderDashboard() {
  return (
    <header className="dashboard-header">
      <Container>
        <nav className="d-flex justify-content-between align-content-center py-4">
          <article className="">
            <img className="user-select-none" src="/olympicslogo.png" alt="" />
          </article>
          <article className="d-flex justify-content-between align-items-center gap-2">
            <ButtonCustom bgColor={"white"}>Volver al Panel Admin</ButtonCustom>
            <ButtonCustom bgColor={"orange"}>Volver al Panel Admin</ButtonCustom>
          </article>
        </nav>
      </Container>
    </header>
  );
}
