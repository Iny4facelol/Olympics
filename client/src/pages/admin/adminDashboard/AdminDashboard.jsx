import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { user } = useAppContext();
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Container className="d-flex  flex-column gap-5 px-4 px-sm-2">
        <div className="d-flex flex-column gap-5">
          <Row>
            <h2 className="fs-1">
              {t("user_dashboard.welcomeUser")}{" "}
              <span style={{ fontWeight: "bold" }} className="custom-span">
                {user.user_name}
              </span>{" "}
            </h2>
          </Row>
          <Row>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold ">
                <Link className="link-hover" to="/admin/createNewCenter">
                  {t("admin_dashboard.createNewCenter")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/manageCenters"}>
                  {t("admin_dashboard.adminCenters")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/createNewResponsable"}>
                  {t("admin_dashboard.createNewResp")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/manageUsers"}>
                  {t("admin_dashboard.adminUsers")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/createNewActivity"}>
                  {t("admin_dashboard.createNewActivity")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/manageActivities"}>
                  {t("admin_dashboard.adminActivities")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/createNewOlympics"}>
                  {t("admin_dashboard.createNewOlympics")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link className="link-hover" to={"/admin/manageOlympics"}>
                  {t("admin_dashboard.adminOlympics")}{" "}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </DashboardLayout>
  );
}
