import { MoveRight, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AuthDashboard({ userData }) {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/details/${userData.user_id}`,
          "get"
        );
        console.log(response);
        setUserDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(userDetails);

  return (
    <section className="d-flex flex-column gap-5">
      <Row>
        <Col>
          <h3 className="text-success">
            Cuenta validada correctamente <ShieldCheck />
          </h3>
          <p className="d-flex gap-2 fw-bold ">
            <Link className="link-hover" to="/admin/createNewCenter">
              Editar datos del perfil <MoveRight color="#ee531e" />
            </Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <h3>Centro de estudios: </h3>
          <p className="fs-5 pretty">Nombre: {userDetails[0]?.center_name}</p>
          <p className="fs-5 pretty">
            Dirección: {userDetails[0]?.center_address}
          </p>
          <p className="fs-5 pretty">
            Localidad: {userDetails[0]?.center_city}
          </p>
        </Col>
        <Col md={6} sm={12}>
          {userDetails[0]?.olympics_name ? (
            <>
              <h3>Información sobre la Olimpiada: </h3>
              <p className="fs-5 pretty">
                Nombre: {userDetails[0]?.olympics_name}
              </p>
              <p className="fs-5 pretty">
                Nombre de la sede: {userDetails[0]?.olympics_host_name}
              </p>
              <p className="fs-5 pretty">
                Dirección: {userDetails[0]?.olympics_host_address},
                {userDetails[0]?.olympics_host_city}
              </p>
            </>
          ) : (
            <h3>No estás asingado a ninguna olimpiada actualmente</h3>
          )}
        </Col>
      </Row>
    </section>
  );
}
