import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CenterClientFormComp from "./components/CenterClienteFormComp";

export default function CenterClientForm() {
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5">
        <h2 className="fs-1">Completar registro del centro</h2>
        <CenterClientFormComp />
      </Container>
    </DashboardLayout>
  );
}
