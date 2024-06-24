import { Outlet, useLocation } from "react-router-dom";
import Menu from "../src/components/Menu/Menu";
import "./index.css";
import Sla from "./components/Sla";

function App() {
  const location = useLocation();

  // Defina as rotas onde o Sla não deve ser exibido
  const noSlaRoutes = ["/login", "/register", "/admin", "/cart"];

  // Verifique se a rota atual está na lista de rotas onde o Sla não deve ser exibido
  const hideSla = noSlaRoutes.includes(location.pathname);

  return (
    <>
      <Menu />
      {!hideSla && <Sla />}
      <Outlet />
    </>
  );
}

export default App;
