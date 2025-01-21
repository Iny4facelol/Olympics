import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useAppContext } from "../../../core/context/AppContext";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAppContext();
  return (
    <DashboardLayout>
      <Container>
        <div className="d-flex flex-column gap-5">
          <Row>
            <h2 className="text-center text-md-start">Panel de {user.user_name}</h2>
          </Row>
          <Row>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2 ">
                <Link className="link-hover" to="/admin/createNewCenter">
                  Crear nuevo centro <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover">
                  Administrar Centros <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover" to={"/admin/createNewResponsable"}>
                  Crear nuevo responsable <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover">
                  Administrar Usuarios <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover" to={"/admin/createNewActivity"}>
                  Crear nueva Actividad <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover">
                  Administrar Actividades <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover" to={"/admin/createNewOlympics"}>
                  Crear nueva Olimpiada <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              md={6}
            >
              <p className="d-flex gap-2">
                <Link className="link-hover">
                  Administrar Olimpiadas <MoveRight color="#ee531e" />
                </Link>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </DashboardLayout>
  );
}
