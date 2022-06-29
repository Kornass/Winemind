import cart from "../images/cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ login, isLoggedIn, logout }) {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="nav">
      <Link to="/">
        <span>Logo here</span>
      </Link>
      <input placeholder="search" />

      {isLoggedIn ? (
        <>
          <Link to="/myAccount">
            <button>My Account</button>
          </Link>
          <button onClick={logout}>LogOut</button>
        </>
      ) : (
        <div>
          <p>I'm a nice provider!</p>
          <SignUp setOpenLogin={setOpenLogin} />
          <LogIn open={openLogin} login={login} />
        </div>
      )}
      <Link to="/Cart">
        <img src={cart} alt="cart" />
      </Link>
    </div>
  );
}
export default Navbar;
