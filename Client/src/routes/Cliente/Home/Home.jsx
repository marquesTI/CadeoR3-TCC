import { useState, useEffect } from "react";
import Carrosel from "../../../components/Carrossel/Carrossel";
import CardProd from "../../../components/CardProd/CardProd";
import Axios from "axios";
import "./Home.css";

function Home() {
  const [listCard, setListCard] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getcards").then((response) => {
      setListCard(response.data);
    });
  }, []);
  return (
    <>
      <div className="container-home">
        <div className="container-content">
          <Carrosel />
          <div className="cards">
            {listCard.map((val) => (
              <CardProd
                listCard={listCard}
                setListCard={setListCard}
                key={val.CodBarras}
                codbarras={val.CodBarras}
                nome={val.Nome}
                tipo={val.Tipo}
                qtd={val.Qtd}
                valor={val.Valor}
                capa={val.Capa}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
