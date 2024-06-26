import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./routes/Cliente/Home/Home.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import Sobre from "./routes/Sobre/Sobre.jsx";
import Register from "./routes/Cliente/Register/Register.jsx";
import DetalheProduto from "./routes/Cliente/DetalhesPrd/Detalhes.jsx";
import Cart from "./routes/Cliente/Cart/Cart.jsx";
import Login from "./routes/Cliente/Login/Login.jsx";
import Checkout from "./routes/Cliente/Checkout/Checkout.jsx";
import { CartProvider } from "./context/CarrinhoContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

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
      { path: "/login", element: <Login /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/sobre", element: <Sobre /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
