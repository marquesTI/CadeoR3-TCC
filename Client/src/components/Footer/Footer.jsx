import "./Footer.css";
import Logo from "../../assets/img/logo.png";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container-footer">
          <p className="text-footer">
            Copyright &copy;;
            <div className="img-logo-adm">
              <img src={Logo} alt="Logo" className="logo-footer" />
            </div>
            os direitos reservados
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
