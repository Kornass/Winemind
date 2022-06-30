import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { URL } from "../config";

function ProviderDetails({ user, setUser }) {
  const [updated, setUpdated] = useState({
    name: user.name,
    eMail: user.eMail,
    companyName: user.companyName,
  });
  const [editing, setEditing] = useState(false);

  const updateInfo = () => {
    setEditing(!editing);
  };
  const updateUser = (e) => {
    debugger;
    e.preventDefault();
    let url = `${URL}/user/${user._id}/update`;
    axios
      .post(url, { oldUser: user.name, updatedUser: updated })
      .then((res) => {
        console.log(res.data);
        setUser({
          ...user,
          name: updated.name,
          eMail: updated.eMail,
          companyName: updated.companyName,
        });
        setUpdated({
          name: "",
          eMail: "",
          companyName: "",
        });
        setEditing(!editing);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      <h2 className="to-edit">User information</h2>
      <button className="edit" onClick={updateInfo}>
        <FaEdit />
      </button>
      <div>
        {editing ? (
          <form onSubmit={updateUser}>
            <input
              value={updated.name}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  name: e.target.value,
                })
              }
            />
            <input
              value={updated.eMail}
              onChange={(e) =>
                setUpdated({ ...updated, eMail: e.target.value })
              }
            />
            <input
              value={updated.companyName}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  companyName: e.target.value,
                })
              }
            />
            <input type="Submit" defaultValue="Submit" />
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
