import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import OlympicsList from "./components/OlympicsList";

export default function AdminOlympics() {
  return (
    <DashboardLayout>
      <Container>
        <h2 className="fs-1">Administrar Olimpiadas</h2>
        <OlympicsList />
      </Container>
    </DashboardLayout>
  );
}
