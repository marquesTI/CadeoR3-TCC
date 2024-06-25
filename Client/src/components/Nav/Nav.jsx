import Cart from "../CartButton/CartButton";
import Search from "../SearchBar/SearchBar";
import Profile from "../ProfileButton/ProfileBtn";
import "../Nav/Nav.css";

function Sla() {
  return (
    <div className="tes">
      <Search />
      <div className="btn-nav">
        <Cart />
        <Profile />
      </div>
    </div>
  );
}

export default Sla;
