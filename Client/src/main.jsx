import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./routes/Cliente/Home/Home.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import Register from "./routes/Cliente/Register/Register.jsx";
import DetalheProduto from "./routes/Cliente/DetalhesPrd/Detalhes.jsx";
import Test from "./routes/Test.jsx";
import Cart from "./routes/Cliente/Cart/Cart.jsx";
import { CartProvider } from "./context/CarrinhoContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Admin", element: <Admin /> },
      { path: "/Register", element: <Register /> },
      { path: "/produto/:codbarras", element: <DetalheProduto /> },
      { path: "/cart", element: <Cart /> },
      { path: "/test", element: <Test /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
