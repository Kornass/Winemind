import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { URL } from "../config";

Modal.setAppElement("#root");

function SignUp() {
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
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const add = (e) => {
    // compare the passwords here
    e.preventDefault();
    debugger;
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
        e.target.reset();
        console.log(res.status);
        setProvider({
          name: "",
          password: "",
          eMail: "",
          companyName: "",
          image: "",
        });

        alert("User added successfully");
      })
      .catch((e) => {
        alert(e);
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
            <label>Create your Login:</label>
            <input
              onChange={(e) =>
                setProvider({ ...provider, name: e.target.value })
              }
            />
            <label>Create your password:</label>
            <input onChange={(e) => setPassword1(e.target.value)} />
            <label>Confirm your password:</label>
            <input onChange={(e) => setPassword2(e.target.value)} />
            <label>Enter your e-mail:</label>
            <input
              onChange={(e) =>
                setProvider({ ...provider, eMail: e.target.value })
              }
            />
            <label>Enter your company name:</label>
            <input
              onChange={(e) =>
                setProvider({ ...provider, companyName: e.target.value })
              }
            />
            <label>Upload an image: (optional)</label>
            <input
              onChange={(e) =>
                setProvider({ ...provider, image: e.target.value })
              }
            />
            <input type="submit" value="submit" className="submit" />
          </form>
        </div>
      </Modal>
    </>
  );
}
export default SignUp;
