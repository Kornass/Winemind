import cartimg from "../images/cart.svg";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Cart from "../containers/Cart";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { URL } from "../config";

function Navbar({
  login,
  isLoggedIn,
  logout,
  cart,
  setCart,
  onAdd,
  onRemove,
  allProd,
  setAllProd,
}) {
  const [openLogin, setOpenLogin] = useState(false);

  const showCart = (e) => {
    const isCart = document.getElementById("cartPopup");

    if (isCart.style.display == "block") {
      isCart.style.display = "none";
    } else {
      isCart.style.display = "block";
    }
  };
  const AllProducts = async () => {
    // debugger;
    let url = `${URL}/product/all`;
    try {
      const res = await axios.get(url);
      setAllProd(res.data);
      //Reloading the page on logo click

      window.location.reload(true);

      // setToDisplay(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   // console.log("smth");
  //   AllProducts();
  // }, []);
  return (
    <div className="nav">
      <Link to="/" onClick={AllProducts}>
        <h4 className="logo">Winemind</h4>
        <p className="logo1">Share your wine</p>
        <p className="logo1">Buy your bottles</p>
      </Link>
      <Search allProd={allProd} onAdd={onAdd} />

      {isLoggedIn ? (
        <>
          <Link to="/myAccount">
            <button className="nav-button">My Account</button>
          </Link>
          <button className="nav-button" onClick={logout}>
            LogOut
          </button>
        </>
      ) : (
        <div className="nav-btns">
          <p>I'm a provider!</p>
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
