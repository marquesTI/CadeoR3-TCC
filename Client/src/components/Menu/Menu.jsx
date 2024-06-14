import { IoHome, IoStorefront } from "react-icons/io5";
import { TbMoodPuzzled } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import Logo from "../../assets/img/logo.png";
import "../Menu/Menu.css";

function Menu() {
  return (
    <div className="menu">
      <div className="img-logo">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-content">
        <ul className="links">
          <li className="li-link">
            <button className="btn-menu">
              <IoHome />
            </button>
            <p className="menu-p">Home</p>
          </li>

          <li className="li-link">
            <button className="btn-menu">
              <IoStorefront />
            </button>
            <p className="menu-p">Store</p>
          </li>

          <li className="li-link">
            <button className="btn-menu">
              <TbMoodPuzzled />
            </button>
            <p className="menu-p">Sobre nós</p>
          </li>

          <li className="li-link">
            <button className="btn-menu">
              <MdSupportAgent />
            </button>
            <p className="menu-p">Suporte</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
