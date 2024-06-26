import "../Register/Register.css";
import { useState } from "react";
import Axios from "axios";

function Register() {
  const initialFormValues = {
    nome: "",
    email: "",
    login: "",
    senha: "",
    tel: "",
    cpf: "",
    rg: "",
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
      tel: values.tel.replace(/\D/g, ""), // Remove caracteres não numéricos do telefone
      cpf: values.cpf.replace(/\D/g, ""), // Remove caracteres não numéricos do CPF
      rg: values.rg.replace(/\D/g, ""), // Remove caracteres não numéricos do RG
      cnpj: values.cnpj === null ? 0 : values.cnpj,
      ie: values.ie === null ? 0 : values.ie,
      cep: values.cep,
      logradouro: values.logradouro,
      uf: values.uf,
      cidade: values.cidade,
      numero: values.numero,
    };

    console.log(dataToSend);

    Axios.post("http://localhost:3001/registerCli", dataToSend)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        setValues(initialFormValues); // Limpa os campos do formulário após o cadastro
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error);
      });
  };

  const handleClearFields = () => {
    setValues(initialFormValues);
  };

  const handleaddValues = (e) => {
    const { name, value } = e.target;

    // Aplica a máscara no campo de telefone
    if (name === "tel") {
      let formattedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      formattedValue = formattedValue.slice(0, 11); // Limita o telefone para 11 dígitos

      if (formattedValue.length > 2) {
        formattedValue = `(${formattedValue.slice(
          0,
          2
        )}) ${formattedValue.slice(2)}`;
      }

      if (formattedValue.length > 7) {
        formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(
          9
        )}`;
      }

      setValues((prevValues) => ({
        ...prevValues,
        [name]: formattedValue,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleCPFChange = (e) => {
    let value = e.target.value;
    // Aplica a máscara CPF: 000.000.000-00
    value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    value = value.slice(0, 11); // Limita o CPF para 11 dígitos
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setValues((prevValues) => ({
      ...prevValues,
      cpf: value, // Atualiza o estado com o CPF formatado
    }));
  };

  const handleRGChange = (e) => {
    let value = e.target.value;
    // Aplica a máscara RG: 00.000.000-0
    value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    value = value.slice(0, 9); // Limita o RG para 9 dígitos
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1})$/, "$1-$2");

    setValues((prevValues) => ({
      ...prevValues,
      rg: value, // Atualiza o estado com o RG formatado
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
        <legend>CADASTRE=SE</legend>
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
            value={values.tel}
            onChange={handleaddValues}
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="input-register"
            value={values.cpf}
            onChange={handleCPFChange}
            required
          />

          <input
            type="text"
            name="rg"
            placeholder="RG"
            className="input-register"
            value={values.rg}
            onChange={handleRGChange}
            required
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
        <button onClick={handleClearFields} className="clear-button">
          Limpar Campos
        </button>
      </fieldset>
    </div>
  );
}

export default Register;
