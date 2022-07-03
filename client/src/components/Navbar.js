import cartimg from "../images/cart.png";
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

  const showCart = () => {
    if (document.getElementById("cartPopup").style.display == "block") {
      document.getElementById("cartPopup").style.display = "none";
    } else {
      document.getElementById("cartPopup").style.display = "block";
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
        <span>Logo here</span>
      </Link>
      <Search allProd={allProd} onAdd={onAdd} />

      {isLoggedIn ? (
        <>
          <Link to="/myAccount">
            <button>My Account</button>
          </Link>
          <button onClick={logout}>LogOut</button>
        </>
      ) : (
        <div>
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
