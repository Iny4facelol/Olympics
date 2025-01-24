import React from "react";
import "./Section3.css";

export default function Section3() {
  return (
    <section className="p-3 p-sm-2 grid">
      <article className="item1">
        <img className="w-100 h-100 object-fit-cover" src="atletismo2.jpg" alt="" />
      </article>
      <article className="item2">
        <img
          className="w-100 h-100 object-fit-cover"
          src="baloncesto4.jpg"
          alt=""
        />
      </article>
      <article className="item3">
        {" "}
        <img
          className="w-100 h-100 object-fit-cover"
          src="voleyball2.jpg"
          alt=""
        />
      </article>
      <article className="item4">
        {" "}
        <img
          className="w-100 h-100 object-fit-cover"
          src="balonmano.jpg"
          alt=""
        />
      </article>
    </section>
  );
}
