import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import "./ProfileBtn.css";
import ProfileOptions from "../ProfileOptions/ProfileOp";

function ProfileBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-btn-container">
      <button type="button" className="profile-button" onClick={toggleOptions}>
        <FaCircleUser />
      </button>
      {isOpen && <ProfileOptions onClose={toggleOptions} />}
    </div>
  );
}

export default ProfileBtn;
