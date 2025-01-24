import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Section2() {
  return (
    <section className="p-3 p-sm-2">
      <Row className="w-100 w-lg-50">
        <Col md={6} sm={12}>
          <h2>
            Quienes somos, <br />
            <span className="custom-span">nuestro proyecto</span>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <p>
            Somos un proyecto educativo-deportivo que busca inspirar a niños y
            niñas en edad escolar. A través de competencias inclusivas y
            divertidas, promovemos la cooperación, el respeto y la excelencia en
            cada actividad deportiva. Nuestra misión es fomentar el desarrollo
            integral de los jóvenes mientras disfrutan del deporte.
          </p>
        </Col>
        <Col md={6} sm={12}>
          <p>
            Somos un proyecto que conecta colegios a través del deporte,
            fomentando valores como el respeto, la inclusión y el esfuerzo.
            Promovemos un espacio donde los jóvenes descubren su potencial y
            crean vínculos duraderos.
          </p>
        </Col>
      </Row>
    </section>
  );
}
