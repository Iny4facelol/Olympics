import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import CenterList from "./components/CenterList";
import { CirclePlus, SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminCenter() {
  const {t} = useTranslation();
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-3">
        <h2 className="fs-1">{t("centers.adminCenters")}</h2>
        <p className="mb-2">
         {t("centers.adminCentersText1")}{" "}
          <CirclePlus color="green" /> {t("centers.adminCentersText2")}
        </p>
        <p>
          {t("centers.adminCentersText3")}{" "}
          <SquarePen color="#0d6efd" /> {t("centers.adminCentersText4")}
        </p>
        <CenterList />
      </Container>
    </DashboardLayout>
  );
}
