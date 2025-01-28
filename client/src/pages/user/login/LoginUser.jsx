import React from "react";
import AppLayout from "../../../core/layout/AppLayout";
import { Container } from "react-bootstrap";
import LoginUserForm from "./components/LoginUserForm";

export default function LoginUser() {

  return (
    <AppLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">Acceso</h2>
        <LoginUserForm />
      </Container>
    </AppLayout>
  );
}
