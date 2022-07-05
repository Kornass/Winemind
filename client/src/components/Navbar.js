import cartimg from "../images/Cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Cart from "../containers/Cart";
import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import { URL } from "../config";
import logo from "../images/logo.png";

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
      <div className="left-nav">
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
        <Search allProd={allProd} onAdd={onAdd} />
      </div>
      <Link to="/" onClick={AllProducts}>
        <img className="logo" src={logo} />

        {/* <h4 className="logo">Winemind</h4>
        <p className="logo1">Share your wine</p>
        <p className="logo1">Buy your bottles</p> */}
      </Link>

      <div id="cartPopup" className="cartPopup">
        <Cart
          cart={cart}
          setCart={setCart}
          onAdd={onAdd}
          onRemove={onRemove}
          showCart={showCart}
        />
      </div>

      <button className="cartbtn" onClick={showCart}>
        <img className="cartlogo" src={cartimg} alt="cart" />
      </button>
    </div>
  );
}
export default Navbar;
