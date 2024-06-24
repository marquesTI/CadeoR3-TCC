import "../ProfileOptions/ProfileOp.css";

function ProfileOptions({ onClose }) {
  return (
    <div className="profile-options">
      <ul>
        <li>Login</li>
        <li>Registrar-se</li>
      </ul>
      <button className="close-button" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}

export default ProfileOptions;
