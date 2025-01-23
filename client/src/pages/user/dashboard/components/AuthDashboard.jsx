import { ShieldCheck } from "lucide-react";
import React from "react";

export default function AuthDashboard() {
  return (
    <section className="d-flex flex-column gap-3">
      <article>
        <h3 className="text-success">
          Cuenta validada correctamente <ShieldCheck />
        </h3>
      </article>
    </section>
  );
}
