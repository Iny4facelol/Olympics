import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CreateOlympicsForm from "./components/CreateOlympicsForm";

export default function CreateOlympics() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">Crear nueva Olimpiada</h2>
        <CreateOlympicsForm />
      </Container>
    </DashboardLayout>
  );
}
