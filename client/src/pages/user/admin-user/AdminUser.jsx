import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Container } from "react-bootstrap";
import UserList from "./components/UserList";
import { SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminUser() {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <Container>
        <h2 className="fs-1">{t("user.adminUsers")}</h2>
        <p>
          {t("user.adminUsersText1")}{" "}
          <SquarePen color="#0d6efd" /> {t("user.adminUsersText2")}
        </p>
        <UserList />
      </Container>
    </DashboardLayout>
  );
}
