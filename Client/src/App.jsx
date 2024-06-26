import { Outlet, useLocation } from "react-router-dom";
import Menu from "../src/components/Menu/Menu";
import "./index.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();

  // Defina as rotas onde o Nav não deve ser exibido
  const noNavRoutes = [
    "/login",
    "/Login",
    "/Register",
    "/register",
    "/admin",
    "/Admin",
    "/cart",
    "/sobre",
    "/Sobre",
    "/checkout",
  ];

  // Verifique se a rota atual está na lista de rotas onde o Nav não deve ser exibido
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <>
      <Menu />
      {!hideNav && <Nav />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
