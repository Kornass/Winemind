import { useState } from "react";
import { URL } from "../config";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout(props) {
  const stripe = useStripe();
  const navigate = useNavigate();

  const createCheckoutSession = async () => {
    let products = props.cart.map((ele) => ({
      name: ele.name,
      images: [ele.img],
      quantity: ele.qty,
      amount: ele.price,
    }));
    try {
      const response = await axios.post(
        `${URL}/payment/create-checkout-session`,
        { products }
      );
      return response.data.ok
        ? (localStorage.setItem(
            "sessionId",
            JSON.stringify(response.data.sessionId)
          ),
          redirect(response.data.sessionId))
        : navigate("/payment/error");
    } catch (error) {
      navigate("/payment/error");
    }
  };
  const redirect = (sessionId) => {
    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(function (result) {});
  };

  const changeQuantity = (e) => {
    console.log(e);
  };
  const calculate_total = () => {
    let total = 0;
    props.cart.forEach((ele) => (total += ele.qty * ele.price));
    return total;
  };
  return (
    <div className="container">
      <h3>Checkout</h3>
      {props.cart.map((e, i) => {
        return (
          <div className="checkout-item" key={i}>
            <img src={e.img} />
            <p>Name:{e.name}</p>
            <p>Type:{e.type}</p>

            <input
              className="quan"
              min={0}
              type="Number"
              defaultValue={e.qty}
              onChange={() => changeQuantity()}
            />

            <p>Price:{e.price}</p>
            <p>Total:{e.price * e.qty}</p>

            <button className="checkout-remove">X</button>
          </div>
        );
      })}
      <p style={{ fontWeight: "bold" }}>Total: {calculate_total()} €</p>
      <div className="payment">
        <button onClick={() => createCheckoutSession()}>Go to payment </button>
      </div>
    </div>
  );
}

export default Checkout;
