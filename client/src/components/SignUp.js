import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function SignUp({ setOpenLogin }) {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState({
    name: "",
    password: "",
    eMail: "",
    companyName: "",
    image: "",
  });
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");

  // const navigate = useNavigate();
  // Toggle sign up modal window
  function toggleModal() {
    setIsOpen(!isOpen);
    setMsg("");
  }
  // OnSubmit adding provider function
  const add = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      return setMsg("Password is not confirmed");
    } else if (password1.length < 8) {
      return setMsg("Password should have at least 8 characters");
    }
    let url = `${URL}/user/register`;
    axios
      .post(url, {
        name: provider.name,
        password: password1,
        eMail: provider.eMail,
        companyName: provider.companyName,
        image: provider.image,
      })
      .then((res) => {
        // debugger;
        console.log(res.data);
        setProvider({
          name: "",
          password: "",
          eMail: "",
          companyName: "",
          image: "",
        });
        setMsg(res.data.message);
        if (res.data.ok) {
          setTimeout(() => {
            toggleModal();
          }, 1000);
        }
        if (res.data.ok) {
          setTimeout(() => {
            setOpenLogin(true);
          }, 1000);
        }
      })
      .catch((error) => {
        setError(error);
        alert(error);
      });
  };
  return (
    <>
      <button className="add" onClick={toggleModal}>
        SignUp
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Sign Up"
        overlayClassName="myoverlay"
        className="myModal"
      >
        <div className="modal">
          <button onClick={toggleModal} className="close">
            X
          </button>
          <p>Sign Up!</p>
          <p>We are very excited to cooperate with you !</p>
          <form onSubmit={add}>
            <label>Create your Login:*</label>
            <input
              required
              onChange={(e) =>
                setProvider({ ...provider, name: e.target.value })
              }
            />
            <label>Create your password:*</label>
            <input
              required
              type="password"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <label>Confirm your password:*</label>
            <input
              required
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label>Enter your e-mail:*</label>
            <input
              required
              type="email"
              onChange={(e) =>
                setProvider({ ...provider, eMail: e.target.value })
              }
            />
            <label>Enter your company name:*</label>
            <input
              required
              onChange={(e) =>
                setProvider({ ...provider, companyName: e.target.value })
              }
            />
            <label>Upload an image URL: (optional)</label>
            <input
              onChange={(e) =>
                setProvider({ ...provider, image: e.target.value })
              }
            />
            <input type="submit" value="submit" className="submit" />
          </form>
          <div className="msg-register">{msg}</div>
        </div>
      </Modal>
    </>
  );
}
export default SignUp;
