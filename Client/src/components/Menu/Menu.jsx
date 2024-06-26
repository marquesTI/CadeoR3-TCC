import { useState } from "react";
import { IoHome, IoStorefront } from "react-icons/io5";
import { TbMoodPuzzled } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import Logo from "../../assets/img/logo.png";
import "../Menu/Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu">
      <div className="img-logo">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? "open" : ""}`}></div>
        <div className={`hamburger ${isOpen ? "open" : ""}`}></div>
        <div className={`hamburger ${isOpen ? "open" : ""}`}></div>
      </button>
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <ul className="links">
          <Link to="/">
            <li className={`li-link ${isOpen ? "open" : ""}`}>
              <button className="btn-menu">
                <IoHome />
              </button>
              <p className="menu-p">Home</p>
            </li>{" "}
          </Link>

          <Link to="/">
            {" "}
            <li className={`li-link ${isOpen ? "open" : ""}`}>
              <button className="btn-menu">
                <IoStorefront />
              </button>
              <p className="menu-p">Store</p>
            </li>{" "}
          </Link>

          <Link to="/">
            <li className={`li-link ${isOpen ? "open" : ""}`}>
              <button className="btn-menu">
                <TbMoodPuzzled />
              </button>
              <p className="menu-p">Sobre nós</p>
            </li>
          </Link>

          <Link to="/">
            <li className={`li-link ${isOpen ? "open" : ""}`}>
              <button className="btn-menu">
                <MdSupportAgent />
              </button>
              <p className="menu-p">Suporte</p>
            </li>{" "}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
