import { useState, useEffect } from "react";
import "../DetalhesPrd/Detalhes.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext"; // Importe o contexto do carrinho

function DetalheProduto() {
  const { codbarras } = useParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);
  const { adicionarAoCarrinho } = useCarrinho(); // Utilize o contexto do carrinho

  useEffect(() => {
    console.log(`Fetching details for produto with codbarras: ${codbarras}`);
    axios
      .get(`http://localhost:3002/produto/${codbarras}`)
      .then((response) => {
        console.log("Dados do produto recebidos:", response.data);
        setProduto(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
        setError(error);
      });
  }, [codbarras]);

  const handleComprar = () => {
    adicionarAoCarrinho(produto);
  };

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
        <h2>Detalhes do Produto</h2>
        <img src={produto.Capa} alt="Imagem do produto" />
      </div>
      <div className="conteudo-info">
        <p>Código de Barras: {produto.CodBarras}</p>
        <p>Nome: {produto.Nome}</p>
        <p>Valor: R${produto.Valor}</p>
        <p>Tipo: {produto.Tipo}</p>
        <p>Quantidade: {produto.Qtd}</p>
      </div>
    </div>
  );
}

export default DetalheProduto;
