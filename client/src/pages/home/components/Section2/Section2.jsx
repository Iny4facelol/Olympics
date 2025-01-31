import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Section2() {
  const { t } = useTranslation();

  return (
    <section id="aboutUs" className="p-3 p-sm-2 d-flex flex-column gap-4">
      <Row className="w-100 w-lg-50">
        <Col md={6} sm={12}>
          <h2 className="fs-2 fw-bold">{t("home.section2.whoWeAre")}</h2>
          <h2 className="fs-2 fw-bold">
            <span className="custom-span">{t("home.section2.ourProject")}</span>
          </h2>
        </Col>
      </Row>
      <div className="d-flex gap-5 justify-content-between">
        <article style={{ width: "45%" }}>
          <p className="pretty">{t("home.section2.text1")}</p>
        </article>
        <article style={{ width: "45%" }}>
          <p>{t("home.section2.text2")}</p>
        </article>
      </div>
    </section>
  );
}
