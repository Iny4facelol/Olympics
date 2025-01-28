import React, { useState } from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import ResponsibleEditModal from "./ResponsibleEditModal";

export default function ResponsibleDashboard() {
  const { user } = useAppContext();
  const [show, setShow] = useState(false);
  const [responsibleEditData, setResponsibleEditData] = useState({});

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
             Te damos la bienvenida, <span className="custom-span">{user.user_name}</span>{" "}
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
                  Editar datos personales <MoveRight color="#ee531e" />
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
                  Asignar Alumnos a Actividades <MoveRight color="#ee531e" />
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
                  Validar Autorizaciones Alumnos <MoveRight color="#ee531e" />
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
