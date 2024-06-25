/*import { useCart } from "../../../context/CarrinhoContext";
import "./Cart.css";

function Cart() {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.Capa}
                  alt={item.Nome}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <p>Nome: {item.Nome}</p>
                  <p>Valor: R${item.Valor}</p>
                  <p>Quantidade: 1</p>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Limpar Carrinho</button>
        </>
      )}
    </div>
  );
}

export default Cart;*/

import { useCart } from "../../../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { clearCart, cartItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem("token"); // Supondo que você esteja usando um token JWT para autenticação
    if (isLoggedIn) {
      navigate("/checkout"); // Redirecionar para a página de finalização
    } else {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate("/login"); // Redirecionar para a página de login
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.Capa} alt={item.Nome} className="cart-item-img" />
              <div className="cart-item-info">
                <p>Nome: {item.Nome}</p>
                <p>Valor: R${item.Valor}</p>
                <p>Quantidade: 1</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Finalizar Compra</button>
      )}
      <button onClick={clearCart}>Limpar Carrinho</button>
    </div>
  );
}

export default Cart;
