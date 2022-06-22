import cart from "../images/cart.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
function Navbar() {
  return (
    <div className="nav">
      <span>Logo here</span>
      <input placeholder="search" />
      <button className="logged">My Account</button>
      <div className="not-logged">
        <p>I'm a nice provider!</p>
        <SignUp />
        <LogIn />
      </div>
      <a>
        <img src={cart} alt="cart" />
      </a>
    </div>
  );
}
export default Navbar;
