import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import AuthUsersList from "./components/AuthUsersList";
import { useTranslation } from "react-i18next";

export default function AuthUsers() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5">
        <h2 className="fs-1">{t("responsible.authUsersTittle")}</h2>
        <AuthUsersList />
      </Container>
    </DashboardLayout>
  );
}
