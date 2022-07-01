import cartimg from "../images/cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Cart from "../containers/Cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ login, isLoggedIn, logout, cart, setCart, onAdd, onRemove }) {
  const [openLogin, setOpenLogin] = useState(false);

  const showCart = () => {
    if (document.getElementById("cartPopup").style.display == "block") {
      document.getElementById("cartPopup").style.display = "none";
    } else {
      document.getElementById("cartPopup").style.display = "block";
    }
  };
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
      <div id="cartPopup" className="cartPopup">
        <Cart cart={cart} setCart={setCart} onAdd={onAdd} onRemove={onRemove} />
      </div>
      <button onClick={showCart}>
        <img src={cartimg} alt="cart" />
      </button>
    </div>
  );
}
export default Navbar;
