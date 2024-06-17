import { Outlet } from "react-router-dom";
import Menu from "../src/components/Menu/Menu";
import "./index.css";

function App() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
