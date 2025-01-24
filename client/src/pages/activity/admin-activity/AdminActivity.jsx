import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import ActivityList from "./components/ActivityList";
import { SquarePen } from "lucide-react";

export default function AdminActivity() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">Administrar actividades</h2>
        <p>
          En caso de necesitar editar una actividad, pulse en{" "}
          <SquarePen color="#0d6efd" /> en la actividad correspondiente.
        </p>
        <ActivityList />
      </Container>
    </DashboardLayout>
  );
}
