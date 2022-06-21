// import { useState, useEffect } from "react";
// import axios from "axios";

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
import LogIn from "./containers/LogIn";
import About from "./containers/About";
import UserAccount from "./containers/UserAccount";
import Register from "./containers/Register";
import SingleProduct from "./containers/SingleProduct";
import ProviderPage from "./containers/ProviderPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          {/* Authorization and credentials checking in Login component */}
          <Route path="/login" element={<LogIn />} />
          {/* Form that will create w new user with accepted credentials */}
          <Route path="/register" element={<Register />} />
          {/* We need some conditional here to check if user is logged in to display User Account. Inside 3 different components for Admin, provider and user */}
          <Route path="/myAccount" element={<UserAccount />} />
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
