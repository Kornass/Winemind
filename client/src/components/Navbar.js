import cart from "../images/cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ login, isLoggedIn }) {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="nav">
      <span>Logo here</span>
      <input placeholder="search" />

      {isLoggedIn ? (
        <Link to="/myAccount">
          <button className="logged">My Account</button>
        </Link>
      ) : (
        <div className="not-logged">
          <p>I'm a nice provider!</p>
          <SignUp setOpenLogin={setOpenLogin} />
          <LogIn open={openLogin} login={login} />
        </div>
      )}

      <a>
        <img src={cart} alt="cart" />
      </a>
    </div>
  );
}
export default Navbar;
