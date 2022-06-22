import cart from "../images/cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useState, useEffect } from "react";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="nav">
      <span>Logo here</span>
      <input placeholder="search" />
      <button className="logged">My Account</button>
      <div className="not-logged">
        <p>I'm a nice provider!</p>
        <SignUp setOpenLogin={setOpenLogin} />
        <LogIn open={openLogin} />
      </div>
      <a>
        <img src={cart} alt="cart" />
      </a>
    </div>
  );
}
export default Navbar;
