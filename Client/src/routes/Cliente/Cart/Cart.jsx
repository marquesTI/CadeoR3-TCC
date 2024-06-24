import { useCart } from "../../../context/CarrinhoContext";
import "./Cart.css";

function Cart() {
  const { cartItems } = useCart();

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
    </div>
  );
}

export default Cart;
