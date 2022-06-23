import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";

Modal.setAppElement("#root");

function LogIn({ open, login }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    open && setIsOpen(true);
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/login`, {
        login: form.login,
        password: form.password,
      });
      setMessage(response.data.message);
      console.log(response.data);
      if (response.data.ok) {
        let decodedToken = jose.decodeJwt(response.data.token);
        console.log(
          "Email extracted from the JWT token after login: ",
          decodedToken.login
        );
        setTimeout(() => {
          toggleModal();
          login(response.data.token);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={toggleModal}>LogIn</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Log in"
        overlayClassName="myoverlay"
        className="myModal"
      >
        <div className="modal">
          <button onClick={toggleModal} className="close">
            X
          </button>

          <form onSubmit={loginHandler} onChange={handleChange}>
            <label>Your login/e-mail adress:</label>
            <input name="login" required type="text" />
            <label>Your password:</label>
            <input required name="password" type="password" />

            <input type="submit" value="submit" className="submit" />
          </form>
          <div className="msg-login"></div>
        </div>
      </Modal>
    </>
  );
}
export default LogIn;
