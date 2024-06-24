import { FaCircleUser } from "react-icons/fa6";
import "../ProfileButton/ProfileBtn.css";

function ProfileBtn() {
  return (
    <button type="button" className="profile-button">
      <FaCircleUser />
    </button>
  );
}

export default ProfileBtn;
