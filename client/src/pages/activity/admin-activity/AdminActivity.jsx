import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import ActivityList from "./components/ActivityList";
import { SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminActivity() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">{t("activities.adminActivities")}</h2>
        <p>
          {t("activities.adminActivitiesText1")}{" "}
          <SquarePen color="#0d6efd" /> {t("activities.adminActivitiesText2")}
        </p>
        <ActivityList />
      </Container>
    </DashboardLayout>
  );
}
