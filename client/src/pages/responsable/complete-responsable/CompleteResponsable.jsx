import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CompleteResponsableForm from "./components/CompleteResponsableForm";

export default function CompleteResponsable() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">Completa tu registro</h2>
        <CompleteResponsableForm />
      </Container>
    </DashboardLayout>
  );
}
