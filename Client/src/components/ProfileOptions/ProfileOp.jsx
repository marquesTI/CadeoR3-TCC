import "../ProfileOptions/ProfileOp.css";
import { Link } from "react-router-dom";

function ProfileOptions({ onClose }) {
  return (
    <div className="profile-options">
      <ul>
        <li>Login</li>
        <li>
          <Link to="/Register">Registrar-se</Link>
        </li>
        <li onClick={onClose}>Fechar</li>
      </ul>
    </div>
  );
}

export default ProfileOptions;
