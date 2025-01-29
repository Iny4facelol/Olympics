import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import UserList from "./components/UserList";
import { SquarePen } from "lucide-react";

export default function AdminUser() {
  return (
    <DashboardLayout>
      <Container>
        <h2 className="fs-1">Administrar Usuarios</h2>
        <p>
          En caso de necesitar editar un usuario, pulse en{" "}
          <SquarePen color="#0d6efd" /> en el usuario correspondiente.
        </p>
        <UserList />
      </Container>
    </DashboardLayout>
  );
}
