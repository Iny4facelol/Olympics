import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CenterList from "./components/CenterList";

export default function AdminCenter() {
  return (
    <DashboardLayout>
      <Container>
        <h2 className="fs-1">Administrar Centros</h2>
        <CenterList />
      </Container>
    </DashboardLayout>
  );
}
