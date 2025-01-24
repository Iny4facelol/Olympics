import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import OlympicsList from "./components/OlympicsList";
import { CirclePlus, SquarePen } from "lucide-react";

export default function AdminOlympics() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">Administrar Olimpiadas</h2>
        <p className="mb-2">
          Para añadir Actividades a las olimpiadas, pulse{" "}
          <CirclePlus color="green" /> en la olimpiada correspondiente.
        </p>
        <p>
          En caso de necesitar editar una olimpiada, pulse en{" "}
          <SquarePen color="#0d6efd" /> en la olimpiada correspondiente.
        </p>
        <OlympicsList />
      </Container>
    </DashboardLayout>
  );
}
