import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Certifique-se de que o caminho está correto

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);

      alert("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Nome de usuário ou senha incorretos.");
    }
  };

  return (
    <div className="container-login">
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nome de Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
