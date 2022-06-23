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

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    setUser(decodedToken.user);
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
    console.log(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Navbar login={login} isLoggedIn={isLoggedIn} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/myAccount"
            element={
              !isLoggedIn ? <Navigate to="/" /> : <UserAccount user={user} />
            }
          />
          {/* based on unique id of product (sku) */}
          <Route path="/wine/:sku" element={<SingleProduct />} />
          {/* based on provider id we display component with information about provider */}
          <Route path="/provider/:id" element={<ProviderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
