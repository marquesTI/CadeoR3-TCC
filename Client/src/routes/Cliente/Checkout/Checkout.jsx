import { useState } from "react";
import { useCart } from "../../../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [tipoPagamento, setTipoPagamento] = useState("Pix");
  const [creditCardInfo, setCreditCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const navigate = useNavigate();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  const handlePaymentChange = (event) => {
    setTipoPagamento(event.target.value);
    if (event.target.value === "Pix" || event.target.value === "Débito") {
      setRandomNumber(generateRandomNumber());
    }
  };

  const handleCreditCardChange = (event) => {
    const { name, value } = event.target;
    setCreditCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (tipoPagamento === "Credito") {
      if (
        !creditCardInfo.number ||
        !creditCardInfo.name ||
        !creditCardInfo.expiry ||
        !creditCardInfo.cvv
      ) {
        alert("Por favor, preencha todas as informações do cartão de crédito.");
        return false;
      }
    }
    return true;
  };

  const handlePurchase = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate("/login");
      return;
    }

    if (!validateFields()) {
      return;
    }

    alert("Compra realizada com sucesso!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container-check">
      <h2>Finalizar Compra</h2>
      <div className="ctn">
        <label>
          Tipo de Pagamento:
          <select value={tipoPagamento} onChange={handlePaymentChange}>
            <option value="Pix">Pix</option>
            <option value="Débito">Débito</option>
            <option value="Credito">Crédito</option>
            <option value="Saldo">Saldo</option>
          </select>
        </label>
        {tipoPagamento === "Credito" && (
          <div className="credit-card-info">
            <label>
              Número do Cartão:
              <InputMask
                mask="9999 9999 9999 9999"
                value={creditCardInfo.number}
                onChange={handleCreditCardChange}
                name="number"
                className="input-check"
              />
            </label>
            <label>
              Nome no Cartão:
              <input
                type="text"
                value={creditCardInfo.name}
                onChange={handleCreditCardChange}
                name="name"
                className="input-check"
              />
            </label>
            <label>
              Validade:
              <InputMask
                mask="99/99"
                value={creditCardInfo.expiry}
                onChange={handleCreditCardChange}
                name="expiry"
                className="input-check"
              />
            </label>
            <label>
              CVV:
              <InputMask
                mask="999"
                value={creditCardInfo.cvv}
                onChange={handleCreditCardChange}
                name="cvv"
                className="input-check"
              />
            </label>
          </div>
        )}

        {(tipoPagamento === "Pix" || tipoPagamento === "Débito") && (
          <div>
            <label>
              Código para Pagamento:
              <input type="text" value={randomNumber} disabled />
            </label>
          </div>
        )}
      </div>

      <button className="btn-finish" onClick={handlePurchase}>
        Finalizar Compra
      </button>
    </div>
  );
}

export default Checkout;
