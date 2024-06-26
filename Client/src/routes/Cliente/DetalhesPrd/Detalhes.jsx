import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../../context/CarrinhoContext";
import "./Detalhes.css";

function DetalheProduto() {
  const { codbarras } = useParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log(`Fetching details for produto with codbarras: ${codbarras}`);
    axios
      .get(`http://localhost:3001/produto/${codbarras}`)
      .then((response) => {
        console.log("Dados do produto recebidos:", response.data);
        setProduto(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
        setError(error);
      });
  }, [codbarras]);

  if (error) {
    return (
      <p>Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>
    );
  }

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container-detalhes">
      <div className="conteudo-img">
        <h2 className="txt-detalhes">
          <p className="txt-detalhes">{produto.Nome}</p>
        </h2>
        <img src={produto.Capa} alt="Imagem do produto" />
      </div>
      <div className="conteudo-info">
        <p className="txt-detalhes-m">{produto.Descricao}</p>
        <p className="txt-detalhes-e"> Genêro: {produto.Estilo}</p>
        <p className="txt-detalhes-v">R${produto.Valor}</p>
      </div>
      <div className="btn">
        <button className="btn-d" onClick={() => addToCart(produto)}>
          adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default DetalheProduto;
