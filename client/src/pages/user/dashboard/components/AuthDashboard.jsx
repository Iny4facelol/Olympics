import { MoveRight, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/axios/axiosHelper";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_IMAGE_URL;

export default function AuthDashboard({ userData }) {
  const [userDetails, setUserDetails] = useState([]);
  const [activities, setActivities] = useState([]);

  console.log(activities);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(
          `api/user/details/${userData.user_id}`,
          "get"
        );
        console.log(response);
        setUserDetails(response);

        // Aqui basicamente se dividen los strings por la coma, y se mapea para limpiar los espacios
        const names = response[0].activities_names
          .split(",")
          .map((name) => name.trim());
        const images = response[0].activities_images
          .split(",")
          .map((image) => image.trim());

        // Aqui se crea un array de objetos con los nombres e imagenes
        const combinedActivities = names.map((name, index) => ({
          name: name,
          image: images[index],
        }));

        setActivities(combinedActivities);
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
          <h3 className="fs-2 fw-bold">Centro de estudios: </h3>
          <p className="fs-5 pretty">
            <span className="fw-bold">Nombre:</span>{" "}
            {userDetails[0]?.center_name}
          </p>
          <p className="fs-5 pretty">
            <span className="fw-bold">Dirección:</span>{" "}
            {userDetails[0]?.center_address}
          </p>
          <p className="fs-5 pretty">
            <span className="fw-bold">Localidad:</span>{" "}
            {userDetails[0]?.center_city}
          </p>
          <p className="fs-5">
            <span className="fw-bold">Responsables del centro: </span>
            {userDetails[0]?.responsables}
          </p>
        </Col>
        <Col md={6} sm={12}>
          {userDetails[0]?.olympics_name ? (
            <>
              <h3 className="fs-2 fw-bold">Información sobre la Olimpiada: </h3>
              <p className="fs-5 pretty">
                <span className="fw-bold">Nombre: </span>
                {userDetails[0]?.olympics_name}
              </p>
              <p className="fs-5 pretty">
                <span className="fw-bold">Nombre de la sede:</span>{" "}
                {userDetails[0]?.olympics_host_name}
              </p>
              <p className="fs-5 pretty">
                <span className="fw-bold">Dirección: </span>
                {userDetails[0]?.olympics_host_address}
              </p>
              <p className="fs-5">
                <span className="fw-bold">Localidad: </span>
                {userDetails[0]?.olympics_host_city}
              </p>
            </>
          ) : (
            <h3 className="fs-2 fw-bold">
              No estás asingado a ninguna olimpiada actualmente
            </h3>
          )}
        </Col>
      </Row>
      <Row>
        <h3 className="fs-2 fw-bold">Actividades</h3>
        {activities.map((activity, index) => (
          <Col md={4} sm={12} key={index}>
            <article
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.425), rgba(66, 66, 66, 0.5)), url(${BACKEND_URL}/${activity.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <p className="text-white fs-3 fw-bold">{activity.name}</p>
            </article>
          </Col>
        ))}
      </Row>
    </section>
  );
}
