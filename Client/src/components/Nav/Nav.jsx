import Cart from "../CartButton/CartButton";
import Search from "../SearchBar/SearchBar";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import "./Nav.css";

function Sla() {
  return (
    <div className="nav">
      <Search />
      <div className="cart">
        <Cart />
        <ProfileBtn />
      </div>
    </div>
  );
}

export default Sla;
