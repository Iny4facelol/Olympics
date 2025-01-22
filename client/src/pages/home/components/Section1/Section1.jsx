import React from "react";
import "./Section1.css";

export default function Section1() {
  return (
    <section className="d-flex gap-5 section-1 flex-column flex-lg-row p-3 p-sm-2">
      <article className="w-100 w-lg-50">
        <h1>
          Creando lazos y valores{" "}
          <span className="custom-span">a través del deporte</span>
        </h1>
        <p>
          Inspirar a niños y niñas en edad escolar a través del deporte y la
          educación, proporcionando experiencias inclusivas que favorezcan su
          crecimiento personal y valores
        </p>
      </article>
      <article className="w-100 w-lg-50 user-select-none">
        <div className="custom-badge">
          <p>1ª</p>
          <p>Edición</p>
        </div>
        <img className="rounded-5 w-100" src="/baloncesto.jpg" alt="" />
      </article>
    </section>
  );
}
