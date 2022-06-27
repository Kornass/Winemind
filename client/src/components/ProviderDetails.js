import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
function ProviderDetails({ user }) {
  const [old, setOld] = useState(user);
  const [updated, setUpdated] = useState("");
  const [editing, setEditing] = useState(false);

  const updateInfo = () => {
    setEditing(!editing);
  };
  const handleEdit = () => {
    console.log("make changes");
  };
  return (
    <>
      <h2 className="to-edit">User information</h2>
      <button className="edit" onClick={updateInfo}>
        <FaEdit />
      </button>
      <div>
        {editing ? (
          <form>
            <input defaultValue={user.name} />
            <input defaultValue={user.eMail} />
            <input defaultValue={user.companyName} />
            <input type="submit" value="submit" onClick={handleEdit} />
          </form>
        ) : (
          <div>
            <p>name: {user.name}</p>
            <p>e-mail: {user.eMail}</p>
            <p>Company name: {user.companyName}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default ProviderDetails;
