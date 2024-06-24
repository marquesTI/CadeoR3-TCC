import { useState, useEffect } from "react";
import Background from "../../../assets/img/background.jpg";
import Carrosel from "../../../components/Carrossel/Carrossel";
import CardProd from "../../../components/CardProd/CardProd";
import Axios from "axios";
import "./Home.css";

function Home() {
  const [listCard, setListCard] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);
  return (
    <>
      <div className="container">
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

      <div className="background-container">
        <div className="main-container">
          <img src={Background} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
