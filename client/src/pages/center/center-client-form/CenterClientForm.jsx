import React from "react";
import AppLayout from "../../../core/layout/AppLayout";
import CenterClientFormComp from "./components/CenterClienteFormComp";
import HeaderDashboard from "../../../core/components/HeaderDashboard";

export default function CenterClientForm() {
  return (
    <AppLayout>
      <HeaderDashboard />
      <h2>Center Client Form</h2>
      <CenterClientFormComp />
    </AppLayout>
  );
}
