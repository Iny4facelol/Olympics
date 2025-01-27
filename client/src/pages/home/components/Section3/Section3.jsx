import React, { useEffect } from "react";
import "./Section3.css";
import { Row } from "react-bootstrap";
import ScrollReveal from "scrollreveal";

export default function Section3() {
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
    <div className="d-flex flex-column gap-4  p-3 p-sm-2">
      <Row>
        <h2 className=" fw-bold fs-2">Descubre todos los deportes</h2>
        <h2 className=" fw-bold fs-2">
          <span className="custom-span">que te esperan</span>
        </h2>
      </Row>
      <section className="grid reveal">
        <article className="item1 p-4  reveal">
          <p className="text-white fw-bold fs-3">Atletismo</p>
        </article>
        <article className="item2 p-4 reveal">
          <p className="text-white fw-bold fs-3">Baloncesto</p>
        </article>
        <article className="item3 p-4 reveal">
          <p className="text-white fw-bold fs-3">Voleibol</p>
        </article>
        <article className="item4 p-4 reveal">
          <p className="text-white fw-bold fs-3">Balonmano</p>
        </article>
      </section>
    </div>
  );
}
