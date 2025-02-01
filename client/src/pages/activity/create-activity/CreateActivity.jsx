import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import CreateActivityForm from "./components/CreateActivityForm";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function CreateActivity() {
  const {t} = useTranslation();
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">{t("admin_dashboard.createNewActivity")}</h2>
        <CreateActivityForm />
      </Container>
    </DashboardLayout>
  );
}
