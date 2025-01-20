import React from "react";
import AppLayout from "../../core/layout/AppLayout";
import { Container } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <AppLayout>
      <Container>
        <h2>¿Te has perdido?</h2>
        <p>Error 404: La página a la que intentas acceder no existe</p>
      </Container>
    </AppLayout>
  );
}
