import { IoMdCart } from "react-icons/io";
import "./CartButton.css";

function CartButton() {
  return (
    <button type="button" className="cart_button">
      <IoMdCart />
      <span className="cart-status">1</span>
    </button>
  );
}

export default CartButton;
