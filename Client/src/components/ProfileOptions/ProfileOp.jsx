import { useContext } from "react";
import "../ProfileOptions/ProfileOp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Ajuste o caminho conforme necessário

function ProfileOptions({ onClose }) {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="profile-options">
      <ul>
        {isAuthenticated ? (
          <>
            <li onClick={logout}>Encerrar Sessão</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Registrar-se</Link>
            </li>
          </>
        )}
        <li onClick={onClose}>Fechar</li>
      </ul>
    </div>
  );
}

export default ProfileOptions;
