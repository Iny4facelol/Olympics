import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CenterList from "./components/CenterList";
import { CirclePlus, SquarePen } from "lucide-react";

export default function AdminCenter() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">Administrar Centros</h2>
        <p className="mb-2">
          Para añadir Olimpiadas a los centros, pulse{" "}
          <CirclePlus color="green" /> en el centro correspondiente.
        </p>
        <p>
          En caso de necesitar editar una centro, pulse en{" "}
          <SquarePen color="#0d6efd" /> en el centro correspondiente.
        </p>
        <CenterList />
      </Container>
    </DashboardLayout>
  );
}
