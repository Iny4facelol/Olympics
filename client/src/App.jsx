import "./App.css";
import { ContextProvider } from "./core/context/AppContext";
import AppRoutes from "./core/routes/AppRoutes";

function App() {
  return (
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  );
}

export default App;
