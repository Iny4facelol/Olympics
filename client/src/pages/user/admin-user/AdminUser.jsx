import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import UserList from "./components/UserList";

export default function AdminUser() {
  return (
    <DashboardLayout>
      <Container>
        <h2 className="fs-1">Administrar Usuarios</h2>
        <UserList />
      </Container>
    </DashboardLayout>
  );
}
