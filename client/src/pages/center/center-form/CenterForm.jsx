import HeaderDashboard from "../../../core/components/HeaderDashboard";
import AppLayout from "../../../core/layout/AppLayout";
import Form from "./components/CenterFormComp";

export default function CenterForm() {
  return (
    <AppLayout>
      <HeaderDashboard />
      <div className="bg-blue-200 py-4 text-center flex flex-col items-center">
        <h2>Crear nuevo centro</h2>
        <Form />
      </div>
    </AppLayout>
  );
}
