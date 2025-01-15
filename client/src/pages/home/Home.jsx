import { Link } from "react-router-dom";
import AppLayout from "../../core/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center gap-4">
      <h1>home</h1>
      <Link to={"/admin/createNewCenter"}>
        <button>Ir a centros</button>
      </Link>
      </div>
    </AppLayout>
  );
}
