import { IoMdCart } from "react-icons/io";
import { useCart } from "../../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import "./CartButton.css";

function CartButton() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <button type="button" className="cart_button" onClick={handleCartClick}>
      <IoMdCart />
      <span className="cart-status">{cartItems.length}</span>
    </button>
  );
}

export default CartButton;
