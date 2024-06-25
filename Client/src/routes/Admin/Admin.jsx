import { useState, useEffect } from "react";
import "../Admin/Admin.css";
import Axios from "axios";
import Cards from "../../components/Cards/Cards";

function Admin() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      codbarras: values.codbarras,
      nome: values.nome,
      qtd: values.qtd,
      tipo: values.tipo,
      descricao: values.descricao,
      valor: values.valor,
      estilo: values.estilo,
      capa: values.capa,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        codbarras: values.codbarras,
        qtd: values.qtd,
        tipo: values.tipo,
        descricao: values.descricao,
        valor: values.valor,
        estilo: values.estilo,
        capa: values.capa,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            CodBarras: response.data[0].CodBarras,
            codbarras: values.codbarras,
            qtd: values.qtd,
            tipo: values.tipo,
            descricao: values.descricao,
            valor: values.valor,
            estilo: values.estilo,
            capa: values.capa,
          },
        ]);
      });
    });
    document.location.reload();
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="container-adm">
      <div className="register-container">
        <h1 className="register-title">Cadê o R3?</h1>

        <input
          type="number"
          name="codbarras"
          placeholder="Código de Barras"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="number"
          name="qtd"
          placeholder="Quantidade"
          className="register-input"
          onChange={handleaddValues}
        />

        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          className="register-input"
          onChange={handleaddValues}
        />

        <input
          type="text"
          name="estilo"
          placeholder="Estilo"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          name="capa"
          placeholder="Capa"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Cards
          key={val.CodBarras} // A propriedade `key` deve ser única
          listCard={listCard}
          setListCard={setListCard}
          codbarras={val.CodBarras}
          nome={val.Nome}
          tipo={val.Tipo}
          estilo={val.Estilo}
          qtd={val.Qtd}
          descricao={val.Descricao}
          valor={val.Valor}
          capa={val.Capa}
        />
      ))}
    </div>
  );
}

export default Admin;
