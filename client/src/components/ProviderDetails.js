import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { URL } from "../config";

function ProviderDetails({ user }) {
  // const [old, setOld] = useState(user);
  const [updated, setUpdated] = useState({
    name: "",
    eMail: "",
    companyName: "",
    image: user.image,
    active: user.active,
  });
  const [editing, setEditing] = useState(false);

  const updateInfo = () => {
    setEditing(!editing);
  };
  const updateUser = (e) => {
    debugger;
    e.preventDefault();
    let url = `${URL}/user/${user.name}/update`;
    axios
      .post(url, {
        oldName: user.name,
        name: updated.name,
        eMail: updated.eMail,
        companyName: updated.companyName,
        image: user.image,
        active: user.active,
      })
      .then((res) => {
        setUpdated({
          name: "",
          eMail: "",
          companyName: "",
          image: user.image,
          active: user.active,
        });
        // setEditing(!editing);
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
              defaultValue={user.name}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  name: e.target.value ? e.target.value : user.name,
                })
              }
            />
            <input
              defaultValue={user.eMail}
              onChange={(e) =>
                setUpdated({ ...updated, eMail: e.target.value || user.eMail })
              }
            />
            <input
              defaultValue={user.companyName}
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
