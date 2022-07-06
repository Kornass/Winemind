import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import { Link } from "react-router-dom";

const PaymentSuccess = ({ setCart }) => {
  const [info, setInfo] = useState({});

  setCart([]);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const sessionId = JSON.parse(localStorage.getItem("sessionId"));
        const response = await axios.get(
          `${URL}/payment/checkout-session?sessionId=${sessionId}`
        );
        localStorage.removeItem("sessionId");
        console.log("== response ==>", response);
        setInfo(response);
        console.log(response);
      } catch (error) {}
    };
    getSessionData();
  }, []);
  return (
    <div className="container">
      <h1>
        Thank you so much for purchasing from our web,{" "}
        {info.data?.customer.name}. An E-mail has been sent at{" "}
        {info.data?.customer.email} with information about your purchase.
      </h1>
      <Link to="/">
        <h2>Go to main page</h2>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
