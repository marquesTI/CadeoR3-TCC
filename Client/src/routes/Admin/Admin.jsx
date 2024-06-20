import { useState, useEffect } from "react";
import "../Admin/Admin.css";
import Axios from "axios";
import Cards from "../../components/Cards/Cards";
import Logo from "../../assets/img/logo.png";

function Admin() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3002/register", {
      codbarras: values.codbarras,
      nome: values.nome,
      qtd: values.qtd,
      tipo: values.tipo,
      descricao: values.descricao,
      valor: values.valor,
      estilo: values.estilo,
      capa: values.capa,
    }).then(() => {
      Axios.post("http://localhost:3002/search", {
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
    Axios.get("http://localhost:3002/getCards").then((response) => {
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
      <div className="img-logo-adm">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="Inputs">
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
        </div>

        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Cards
          listCard={listCard}
          setListCard={setListCard}
          key={val.CodBarras}
          codbarras={val.CodBarras}
          nome={val.Nome}
          tipo={val.Tipo}
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
