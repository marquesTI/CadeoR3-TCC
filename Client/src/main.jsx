import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./routes/Home/Home.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import Register from "./routes/Cliente/Register/Register.jsx";
import DetalheProduto from "./routes/DetalhesPrd/Detalhes.jsx";
import Test from "./routes/Test.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/Admin", element: <Admin /> },
      { path: "/Register", element: <Register /> },
      { path: "/produto/:codbarras", element: <DetalheProduto /> },
      { path: "/test", element: <Test /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
