import { useState } from "react";
import { useCart } from "../../../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import "../Checkout/Checkout.css";
import axios from "axios";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [tipoPagamento, setTipoPagamento] = useState("Pix");
  const navigate = useNavigate();

  const handlePaymentChange = (event) => {
    setTipoPagamento(event.target.value);
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/completePurchase",
        {
          vNf: 1,
          vCodBarras: cartItems.map((item) => item.codbarras),
          vTipoPagamento: tipoPagamento,
          vQtdDesejada: cartItems.map((item) => item.qtd),
        },
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.error) {
        alert(response.data.message);
      } else {
        alert("Compra realizada com sucesso!");
        clearCart();
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      alert("Erro ao finalizar a compra. Por favor, tente novamente.");
    }
  };

  console.log(handlePurchase);

  return (
    <div className="container-check">
      <h2>Finalizar Compra</h2>
      <div>
        <label>
          Tipo de Pagamento:
          <select value={tipoPagamento} onChange={handlePaymentChange}>
            <option value="Pix">Pix</option>
            <option value="Débito">Débito</option>
            <option value="Credito">Crédito</option>
            <option value="Saldo">Saldo</option>
          </select>
        </label>
      </div>
      <button onClick={handlePurchase}>Finalizar Compra</button>
    </div>
  );
}

export default Checkout;
