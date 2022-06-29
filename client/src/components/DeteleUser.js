import { URL } from "../config";
import axios from "axios";

function DeleteUser({ provider }) {
  const deleteUser = () => {
    console.log(provider);
    let url = `${URL}/user/delete`;
    axios.post(url, {
      _id: provider._id,
    });
  };

  return (
    <button className="delete-user" onClick={deleteUser}>
      X
    </button>
  );
}
export default DeleteUser;
