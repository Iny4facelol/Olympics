import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import {  BrickWall, Eye, Goal, Handshake } from "lucide-react";
import ScrollReveal from "scrollreveal";
import "./Section4.css";
import { useAppContext } from "../../../../core/context/AppContext";
import { useTranslation } from "react-i18next";

export default function Section4() {
  const { themeSwitcher } = useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 200,
      delay: 200,
      easing: "ease-in-out",
      interval: 200,
      origin: "bottom",
    });
  }, []);

  return (
    <Container id="valours" className="d-flex w-100 justify-content-center">
      <Container className="container-1 reveal">
        <Row id="valours" className="pt-5 reveal">
          <h2 className="fs-2 fw-bold text-white">{t("home.section4.ourValues")}</h2>
        </Row>
        <Row className="d-flex z-3">
          <div className={`grid-2 py-5 card-container ${themeSwitcher ? "text-black" : "text-black"}` }>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                {t("home.section4.missionTitle")} <Goal color="#ee531e" strokeWidth={3} />
              </h3>
              <p>
                {t("home.section4.missionText")}
              </p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                {t("home.section4.visionTitle")} <Eye color="#ee531e" strokeWidth={3} />
              </h3>
              <p>{t("home.section4.visionText")}</p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
               {t("home.section4.pillarsTitle")} <BrickWall color="#ee531e" strokeWidth={2.5} />
              </h3>
              <p>
                {t("home.section4.pillarsText")}
              </p>
            </article>
            <article className="bg-white item-grid-2 reveal">
              <h3 className="d-flex fw-bold justify-content-between">
                {t("home.section4.commitmentTitle")} <Handshake color="#ee531e" strokeWidth={3} />
              </h3>
              <p>
                {t("home.section4.commitmentText")}
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
