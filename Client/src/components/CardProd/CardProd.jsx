import { useNavigate } from "react-router-dom";
import "../CardProd/CardProd.css";

function CardProd(props) {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`produto/${props.codbarras}`);
  };

  return (
    <div className="cardprod-container" onClick={handleShowDetails}>
      <img src={props.capa} alt="Imagem produto" className="img-prod" />
      <h1 className="card-nome">{props.nome}</h1>
      <p className="card-valor">R${props.valor}</p>
      <p className="card-tipo">{props.tipo}</p>
    </div>
  );
}

export default CardProd;
