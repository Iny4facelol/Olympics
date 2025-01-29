import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import {  BrickWall, Eye, Goal, Handshake } from "lucide-react";
import ScrollReveal from "scrollreveal";
import "./Section4.css";
import { useAppContext } from "../../../../core/context/AppContext";

export default function Section4() {
  const { themeSwitcher } = useAppContext();

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 700,
      delay: 350,
      easing: "ease-in-out",
      interval: 200,
      origin: "bottom",
    });
  }, []);

  return (
    <Container id="valours" className="d-flex w-100 justify-content-center">
      <Container className="container-1 reveal">
        <Row id="valours" className="pt-5 reveal">
          <h2 className="fs-2 fw-bold text-white">Nuestros valores</h2>
        </Row>
        <Row className="d-flex z-3">
          <div className={`grid-2 py-5 card-container ${themeSwitcher ? "text-black" : "text-black"}` }>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                Misión <Goal color="#ee531e" strokeWidth={3} />
              </h3>
              <p>
                Motivar a niños y niñas con deporte y educación fomentando su
                desarrollo y valores.
              </p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                Visión <Eye color="#ee531e" strokeWidth={3} />
              </h3>
              <p>Convertirse en un evento autonómico con crecimiento anual</p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                Pilares <BrickWall color="#ee531e" strokeWidth={2.5} />
              </h3>
              <p>
                Deportividad, igualdad, respeto, trabajo en equipo, esfuerzo y
                superación.
              </p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                Compromiso <Handshake color="#ee531e" strokeWidth={3} />
              </h3>
              <p>
                Creemos en el deporte como herramienta de inclusión y desarrollo
                integral.
              </p>
            </article>
          </div>
        </Row>
      </Container>
      <div className="d-flex justify-content-end container-2 reveal img-container">
        <img className="fut-img" src="/fotobaseball.webp" alt="" />
      </div>
    </Container>
  );
}
