import { IoMdCart } from "react-icons/io";
import "./CartButton.css";
// Importe o contexto do carrinho

function CartButton() {
  return (
    <button type="button" className="cart_button">
      <IoMdCart />
      <span className="cart-status"></span>
    </button>
  );
}

export default CartButton;
