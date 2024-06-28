import { useState } from "react";
import Axios from "axios";
import "./AdmLogin.css";

function AdmLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    Axios.post("http://localhost:3001/loginadm", credentials).then(
      (response) => {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/admin";
        } else {
          alert("Invalid credentials");
        }
      }
    );
  };

  return (
    <div className="container-loginadm">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="login-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default AdmLogin;
