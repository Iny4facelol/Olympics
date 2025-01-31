import { Toaster } from "sonner";
import "./App.css";
import { ContextProvider } from "./core/context/AppContext";
import AppRoutes from "./core/routes/AppRoutes";

function App() {
  return (
    <ContextProvider>
      <Toaster richColors position="top-center" />
      <AppRoutes />
    </ContextProvider>
  );
}

export default App;
