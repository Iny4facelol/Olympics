import { Container } from "react-bootstrap";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import CenterFormComp from "./components/CenterFormComp";

export default function CenterForm() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">Crear nuevo centro</h2>
        <CenterFormComp />
      </Container>
    </DashboardLayout>
  );
}
