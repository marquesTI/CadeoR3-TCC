import "../Register/Register.css";
import { useState } from "react";
import Axios from "axios";

function Register() {
  const initialFormValues = {
    nome: "",
    email: "",
    login: "",
    senha: "",
    tel: null,
    cpf: null,
    rg: null,
    cnpj: null,
    ie: null,
    cep: "",
    logradouro: "",
    uf: "",
    cidade: "",
    numero: "",
  };

  const [values, setValues] = useState(initialFormValues);

  const handleRegisterCli = () => {
    const dataToSend = {
      nome: values.nome,
      email: values.email,
      login: values.login,
      senha: values.senha,
      tel: values.tel === null ? 0 : values.tel,
      cpf: values.cpf === null ? 0 : values.cpf,
      rg: values.rg === null ? 0 : values.rg,
      cnpj: values.cnpj === null ? 0 : values.cnpj,
      ie: values.ie === null ? 0 : values.ie,
      cep: values.cep,
      logradouro: values.logradouro,
      uf: values.uf,
      cidade: values.cidade,
      numero: values.numero,
    };

    console.log(dataToSend);

    Axios.post("http://localhost:3002/registerCli", dataToSend)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        setValues(initialFormValues); // Limpa os campos do formulário após o cadastro
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error);
      });
    document.location.reload();
  };

  const handleaddValues = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function buscarCep(e) {
    const cep = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((dados) => {
        setValues((prevValues) => ({
          ...prevValues,
          logradouro: dados.logradouro,
          cidade: dados.localidade,
          uf: dados.uf,
        }));
        document.getElementsByName("numero")[0].focus();
      });
  }

  return (
    <div className="form">
      <fieldset>
        <legend>Dados</legend>
        <div>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            className="input-register"
            value={values.nome}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input-register"
            value={values.email}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="login"
            placeholder="Login"
            className="input-register"
            value={values.login}
            onChange={handleaddValues}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="input-register"
            value={values.senha}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="tel"
            placeholder="Telefone"
            className="input-register"
            value={values.tel === null ? "" : values.tel}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="input-register"
            value={values.cpf === null ? "" : values.cpf}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="rg"
            placeholder="RG"
            className="input-register"
            value={values.rg === null ? "" : values.rg}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            className="input-register"
            value={values.cnpj === null ? "" : values.cnpj}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="ie"
            placeholder="IE"
            className="input-register"
            value={values.ie === null ? "" : values.ie}
            onChange={handleaddValues}
          />

          <p>
            CEP:
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              className="input-register"
              value={values.cep}
              onChange={handleaddValues}
              onBlur={buscarCep}
            />
          </p>

          <p>
            Rua:
            <input
              type="text"
              name="logradouro"
              placeholder="Logradouro"
              className="input-register"
              value={values.logradouro}
              readOnly
            />
          </p>

          <input
            type="text"
            name="uf"
            placeholder="UF"
            className="input-register"
            value={values.uf}
            readOnly
          />

          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            className="input-register"
            value={values.cidade}
            readOnly
          />

          <p>
            Numero:
            <input
              type="text"
              name="numero"
              placeholder="Número"
              className="input-register"
              value={values.numero}
              onChange={handleaddValues}
            />
          </p>
        </div>
        <button onClick={handleRegisterCli} className="register-button">
          Cadastrar
        </button>
      </fieldset>
    </div>
  );
}

export default Register;
