import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

Modal.setAppElement("#root");

function LogIn({ open }) {
  const [isOpen, setIsOpen] = useState(open);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
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

          <form>
            <label>Your login/e-mail adress:</label>
            <input required type="text" />
            <label>Your password:</label>
            <input required type="text" />

            <input type="submit" value="submit" className="submit" />
          </form>
          <div className="msg-login"></div>
        </div>
      </Modal>
    </>
  );
}
export default LogIn;