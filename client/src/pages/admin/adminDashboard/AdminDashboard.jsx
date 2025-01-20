import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";

export default function AdminDashboard() {
  const { user } = useAppContext();
  return (
    <DashboardLayout>
      <Container>
        <h2>Panel de {user.user_name}</h2>
      </Container>
    </DashboardLayout>
  );
}
