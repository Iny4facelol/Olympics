import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import OlympicsList from "./components/OlympicsList";
import { CirclePlus, SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminOlympics() {
  const {t} = useTranslation()
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">{t("admin_dashboard.adminOlympics")}</h2>
        <p className="mb-2">
          {t("olympics.olympicsText1")}{" "}
          <CirclePlus color="green" /> {t("olympics.olympicsText2")}
        </p>
        <p>
          {t("olympics.olympicsText3")}{" "}
          <SquarePen color="#0d6efd" /> {t("olympics.olympicsText4")}
        </p>
        <OlympicsList />
      </Container>
    </DashboardLayout>
  );
}
