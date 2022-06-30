import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "./config";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Cart from "./containers/Cart";
import About from "./containers/About";
import UserAccount from "./containers/UserAccount";
import SingleProduct from "./containers/SingleProduct";
import ProviderPage from "./containers/ProviderPage";
import * as jose from "jose";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartstate")) || []
  );
  const [allProd, setAllProd] = useState([]);

  // fetch all prods
  const AllProducts = async () => {
    let url = `${URL}/product/all`;
    try {
      const res = await axios.get(url);
      setAllProd(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    AllProducts();
  }, []);

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setToken(JSON.parse(localStorage.getItem("token")));
          setIsLoggedIn(false);
        }
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${URL}/user/verify_token`);
        return response.data.ok ? login(token) : logout();
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  // cart functions

  useEffect(() => {
    localStorage.setItem("cartstate", JSON.stringify(cart));
  }, [cart]);

  const onAdd = (product) => {
    const exist = cart.find((ele) => ele._id === product._id);
    if (exist) {
      setCart(
        cart.map((ele) =>
          ele._id === product._id ? { ...exist, qty: exist.qty + 1 } : ele
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cart.find((ele) => ele._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((ele) => ele._id !== product._id));
    } else {
      setCart(
        cart.map((ele) =>
          ele._id === product._id ? { ...exist, qty: exist.qty - 1 } : ele
        )
      );
    }
  };
  // end of cart function
  const loggedInfo = async (id) => {
    let url = `${URL}/user/logged/${id}`;
    try {
      const res = await axios.get(url);
      setUser(res.data.logged);
    } catch (e) {
      console.log(e);
    }
  };

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    loggedInfo(decodedToken._id);
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          login={login}
          isLoggedIn={isLoggedIn}
          logout={logout}
          cart={cart}
          setCart={setCart}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                allProd={allProd}
                setAllProd={setAllProd}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            }
          />
          <Route
            path="/myAccount"
            element={
              !isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <UserAccount
                  allProd={allProd}
                  setAllProd={setAllProd}
                  setUser={setUser}
                  user={user}
                />
              )
            }
          />
          {/* based on unique id of product (sku) */}
          <Route
            path="/single/:sku"
            element={<SingleProduct onAdd={onAdd} allProd={allProd} />}
          />
          {/* based on provider id we display component with information about provider */}
          <Route path="/provider/:id" element={<ProviderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
