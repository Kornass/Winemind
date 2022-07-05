import React, { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  useEffect(() => {
    const getSessionData = async () => {
      try {
        const sessionId = JSON.parse(localStorage.getItem("sessionId"));
        const response = await axios.get(
          `http://localhost:4242/payment/checkout-session?sessionId=${sessionId}`
        );
        localStorage.removeItem("sessionId");
        console.log("== response ==>", response);
      } catch (error) {}
    };
    getSessionData();
  }, []);

  return (
    <div className="message_container">
      <div style={{ border: "2px solid  #35BFDE" }} className="message_box">
        <div className="message_box_left">
          <img
            alt="smile_icon"
            className="image"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mr._Smiley_Face.svg/800px-Mr._Smiley_Face.svg.png"
            }
          />
        </div>
        <div style={{ color: "#35BFDE" }} className="message_box_right">
          Payment Successfull
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
