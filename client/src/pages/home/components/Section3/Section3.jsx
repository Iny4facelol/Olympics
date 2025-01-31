import React, { useEffect } from "react";
import "./Section3.css";
import { Row } from "react-bootstrap";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

export default function Section3() {
  const { t } = useTranslation();

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 500,
      delay: 200,
      easing: "ease-in-out",
      interval: 200,
      origin: "bottom",
    });
  }, []);

  return (
    <div className="d-flex flex-column gap-4  p-3 p-sm-2">
      <Row>
        <h2 className=" fw-bold fs-2">{t("home.section3.discover")}</h2>
        <h2 className=" fw-bold fs-2">
          <span className="custom-span">{t("home.section3.discover2")}</span>
        </h2>
      </Row>
      <section className="grid reveal">
        <article className="item1 p-4  reveal">
          <p className="text-white fw-bold fs-3">
            {t("home.section3.athletics")}
          </p>
        </article>
        <article className="item2 p-4 reveal">
          <p className="text-white fw-bold fs-3">
            {t("home.section3.basketball")}
          </p>
        </article>
        <article className="item3 p-4 reveal">
          <p className="text-white fw-bold fs-3">
            {t("home.section3.volleyball")}
          </p>
        </article>
        <article className="item4 p-4 reveal">
          <p className="text-white fw-bold fs-3">
            {t("home.section3.handball")}
          </p>
        </article>
      </section>
    </div>
  );
}
