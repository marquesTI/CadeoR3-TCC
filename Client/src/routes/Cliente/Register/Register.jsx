import { Container, Box } from "@chakra-ui/react";
import { useState } from "react";
import Axios from "axios";
import "../Register/Register.css";

function Register() {
  const [values, setValues] = useState();
  const handleRegisterCli = () => {
    console.log(handleRegisterCli)
    Axios.post("http://localhost:3002/registerCli", {
      nome: values.nome,
      email: values.email,
      login: values.login,
      senha: values.senha,
      tel: values.tel,
      cpf: values.cpf,
      rg: values.rg,
      cnpj: values.cnpj,
      ie: values.ie,
      cep: values.cep,
      logradouro: values.logradouro,
      uf: values.uf,
      cidade: values.cidade,
      numero: values.numero,
    });
    document.location.reload();
  };

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <>
      <Container maxW="container.sm" centerContent>
        <Box p="6">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>
        <Box p="6">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>  

        <Box p="6">
          <input
            type="text"
            name="login"
            placeholder="Login"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="password"
            name="confSenha"
            placeholder="Confirme a sua senha"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="tel"
            placeholder="Telefone"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="cpf"
            placeholder="CPF"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="rg"
            placeholder="RG"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="cnpj"
            placeholder="CNPJ"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="ie"
            placeholder="IE"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="cep"
            placeholder="CEP"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="text"
            name="logradouro"
            placeholder="Logradouro"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="text"
            name="uf"
            placeholder="UF"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6">
          <input
            type="number"
            name="numero"
            placeholder="Numero da residência"
            className="input-register"
            onChange={handleaddValues}
          />
        </Box>

        <Box p="6" centerContent>
          <button onClick={handleRegisterCli} className="register-button">
            Cadastrar
          </button>
        </Box>
      </Container>
    </>
  );
}

export default Register;
