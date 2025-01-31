import { Container } from "react-bootstrap";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import CenterFormComp from "./components/CenterFormComp";
import { useTranslation } from "react-i18next";

export default function CenterForm() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <Container className="d-flex flex-column gap-5 px-4 px-sm-2">
        <h2 className="fs-1">{t("admin_dashboard.createNewCenter")}</h2>
        <CenterFormComp />
      </Container>
    </DashboardLayout>
  );
}
