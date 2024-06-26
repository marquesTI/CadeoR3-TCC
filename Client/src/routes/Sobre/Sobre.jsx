import Logo from "../../assets/img/logo.png";
import "./Sobre.css";
function Sobre() {
  return (
    <>
      <div className="img-logo-Sobre">
        <img src={Logo} alt="Logo" className="logo-sobre" />
      </div>
      <div className="text-sobre">
        <p className="text-sobre-L">
          O Cadê o R3 se orienta por quatro pilares: obsessão pelo cliente,
          paixão por invenções, compromisso com excelência operacional e visão
          de longo prazo. Nos empenhamos todos os dias para sermos a empresa
          mais dedicada a auxiliar o cliente, a melhor loja e o lugar mais
          seguro para comprar seus jogos. Somos pioneiros em diversas ações e
          iniciativas para facilitar a vida do cliente, como, por exemplo:
          avaliações de consumidores, compra fácil e recomendações
          personalizadas de jogos.
        </p>
      </div>

      <div className="duas">
        <div className="um">
          <h1 className="text-title">Princípios de Liderança</h1>
          <div className="text-sobre-L">
            Nossos Princípios de Liderança são mais do que promoções. Os
            princípios orientam nossas discussões e decisões todos os dias.
          </div>
        </div>
        <div className="um">
          <h1 className="text-title">O que significa Cadê o R3?</h1>
          <div className="text-sobre-L">
            Por que muitos gamers ficavam confusos quando o jogo pedia para
            apertar o botão "R3" Porque eles estavam "presos" entre continuar
            jogando e procurar onde estava esse botão!
          </div>
        </div>
      </div>
    </>
  );
}

export default Sobre;
