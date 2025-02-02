import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CompleteResponsableForm from "./components/CompleteResponsableForm";
import { useTranslation } from "react-i18next";

export default function CompleteResponsable() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">{t("responsible.completeRespTittle")}</h2>
        <CompleteResponsableForm />
      </Container>
    </DashboardLayout>
  );
}
