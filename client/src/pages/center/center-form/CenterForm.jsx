import { Container } from "react-bootstrap";
import FormComp from "./components/CenterFormComp";
import DashboardLayout from "../../../core/layout/DashboardLayout";

export default function CenterForm() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5">
        <h2 className="fs-1">Crear nuevo centro</h2>
        <FormComp />
      </Container>
    </DashboardLayout>
  );
}
