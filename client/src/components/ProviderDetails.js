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

  const closeEdit = () => {
    setUpdated({
      name: user.name,
      eMail: user.eMail,
      companyName: user.companyName,
    });
    setEditing(!editing);
  };
  return (
    <>
      <h3>User information</h3>
      <div className="edit">
        {/* <button className="editbtn" onClick={updateInfo}>
        <FaEdit />
      </button> */}

        {user.image ? (
          <img src={user.image} alt="provider image" />
        ) : (
          <img
            src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            alt="default picture"
          />
        )}

        {editing ? (
          <form onSubmit={updateUser} className="edit-form">
            <div className="close-details">
              <label>Name:</label>
              <button onClick={closeEdit}>X</button>
            </div>
            <input
              value={updated.name}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  name: e.target.value,
                })
              }
            />
            <label>E-mail:</label>
            <input
              value={updated.eMail}
              onChange={(e) =>
                setUpdated({ ...updated, eMail: e.target.value })
              }
            />
            <label>Company name:</label>
            <input
              value={updated.companyName}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  companyName: e.target.value,
                })
              }
            />
            <input type="Submit" defaultValue="Submit" className="submit" />
          </form>
        ) : (
          <div className="userInfo">
            <span className="bold">Name:</span>{" "}
            <button className="editbtn" onClick={updateInfo}>
              <FaEdit />
            </button>
            <p> {user.name}</p>
            <p className="bold">E-mail:</p>
            <p> {user.eMail}</p>
            <p className="bold">Company name:</p>
            <p> {user.companyName}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default ProviderDetails;
