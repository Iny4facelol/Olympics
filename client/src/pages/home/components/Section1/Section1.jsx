import React from "react";
import "./Section1.css";
import { useTranslation } from "react-i18next";

export default function Section1() {
  const { t } = useTranslation();

  return (
    <section className="d-flex gap-5 section-1 flex-column flex-lg-row p-3 p-sm-2">
      <article className="w-100 w-lg-50">
        <h1>
          {t("home.section1.mainTitle")}{" "}
          <span className="custom-span">
            {t("home.section1.mainTitle2")}
          </span>
        </h1>
        <p>{t("home.section1.mainSubtitle")}</p>
      </article>
      <article className="w-100 w-lg-50 user-select-none">
        <div className="custom-badge">
          <p className="diagonal-text fs-1">
            {t("home.section1.firstEdition")}
          </p>
          <p className="diagonal-text">{t("home.section1.edition")}</p>
        </div>
        <img className="rounded-5 w-100" src="/baloncestofinal.webp" alt="" />
      </article>
    </section>
  );
}
