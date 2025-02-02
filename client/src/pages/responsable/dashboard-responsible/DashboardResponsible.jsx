import React, { useState } from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import ResponsibleEditModal from "./components/ResponsibleEditModal";
import { useTranslation } from "react-i18next";

export default function ResponsibleDashboard() {
  const { user } = useAppContext();
  const [show, setShow] = useState(false);
  const [responsibleEditData, setResponsibleEditData] = useState({});
  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (user_id) => {
    const data = user_id;
    setResponsibleEditData(data);
    handleShow();
  };

  return (
    <DashboardLayout>
      <Container>
        <div className="d-flex flex-column gap-5">
          <Row>
            <h2 className="fs-1">
              {t("responsible.dashRespTitle")}{" "}
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
                <Link
                  className="link-hover"
                  onClick={() => handleEdit(user.user_id)}
                >
                  {t("responsible.dashRespEdit")}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link
                  className="link-hover"
                  to={"/user/res_dashboard/addActivitiesToUser"}
                >
                  {t("responsible.assignActivity")}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 fw-bold">
                <Link
                  className="link-hover"
                  to={"/user/res_dashboard/authUser"}
                >
                  {t("responsible.validateAuth")}
                  <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
          </Row>
        </div>
        <ResponsibleEditModal
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          data={responsibleEditData}
        />
      </Container>
    </DashboardLayout>
  );
}
