import React from "react";
import "./Cards.css";
import FormDialog from "../FormDialog/FormDialog";

function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        tipo={props.tipo}
        valor={props.valor}
        descricao={props.descricao}
        estilo={props.estilo}
        capa={props.capa}
        qtd={props.qtd}
        listCard={props.listCard}
        setListCard={props.setListCard}
        codbarras={props.codbarras}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <img src={props.capa} alt="Imagem produto" />
        <h1 className="card-title">{props.nome}</h1>
        <h1 className="card-title">{props.codbarras}</h1>
        <p className="card-id">{props.valor}</p>
        <p className="card-cartegory">{props.tipo}</p>
      </div>
    </>
  );
}

export default Card;
