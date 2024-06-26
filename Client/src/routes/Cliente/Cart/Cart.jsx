import { useCart } from "../../../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { clearCart, cartItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate("/login");
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="text-cart">Seu carrinho está vazio</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.Capa} alt={item.Nome} className="cart-item-img" />
              <div className="cart-item-info">
                <p className="text-cart">Nome: {item.Nome}</p>
                <p className="text-cart">Valor: R${item.Valor}</p>
                <p className="text-cart">Quantidade: {item.Qtd}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="btns">
        {cartItems.length > 0 && (
          <button onClick={handleCheckout} className="btn-comprar">
            Finalizar Compra
          </button>
        )}
        <button onClick={clearCart} className="btn-limpar">
          Limpar Carrinho
        </button>
      </div>
    </div>
  );
}

export default Cart;
