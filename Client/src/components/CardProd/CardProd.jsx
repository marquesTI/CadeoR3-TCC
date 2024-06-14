import "../CardProd/CardProd.css";

function CardProd(props) {
  return (
    <>
      <div className="cardprod-container">
        <img src={props.capa} alt="Imagem produto" className="img-prod" />
        <h1 className="card-nome">{props.nome}</h1>
        <p className="card-valor">R${props.valor}</p>
        <p className="card-tipo">{props.tipo}</p>
      </div>
    </>
  );
}

export default CardProd;
