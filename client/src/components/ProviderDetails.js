import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
function ProviderDetails({ user }) {
  console.log(user);
  const [old, setOld] = useState(user);
  const [updated, setUpdated] = useState("");

  const updateInfo = (e) => {
    console.log(e.target);
  };
  return (
    <>
      <h2 className="to-edit">User information</h2>
      <button className="edit" onClick={updateInfo}>
        <FaEdit />
      </button>
      <div className="user-info">
        <div>
          <span>name: {user.name}</span>
        </div>
        <div>
          <span>e-mail: {user.eMail}</span>
        </div>
        <div>
          <span>Company name: {user.companyName}</span>
        </div>
      </div>
    </>
  );
}
export default ProviderDetails;
