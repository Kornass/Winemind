import { useState, useEffect } from "react";
import { URL } from "../config";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInfo, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

function Checkout(props) {
  const stripe = useStripe();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const calculate_total = () => {
    let total = 0;
    props.cart.forEach((ele) => (total += ele.qty * ele.price));
    return total;
  };

  const removeItem = (item) => {
    let cartCopy = [...props.cart];
    cartCopy.splice(item, 1);
    props.setCart(cartCopy);
  };

  return (
    <div className="container">
      <h3>Checkout</h3>
      {props.cart.map((e, i) => {
        return (
          <div className="checkout-item" key={i}>
            <img src={e.img} />
            <div>
              <p>
                <span className="bold">Name: </span>
                {e.name}
              </p>
              <p>
                <span className="bold">Type: </span>
                {e.type}
              </p>

              <button className="button-empty" onClick={() => props.onAdd(e)}>
                <FaPlusCircle />
              </button>
              <button
                className="button-empty"
                onClick={() => props.onRemove(e)}
              >
                <FaMinusCircle />
              </button>

              <p>
                <span className="bold">Price: </span>
                {e.price}€
              </p>
              <p>
                <span className="bold total">Total: </span>
                {e.price * e.qty}€
              </p>

              <button
                className="button-empty-delete"
                onClick={() => removeItem(i)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
      <h2 style={{ textAlign: "center", paddingTop: "20px" }}>
        Total: {calculate_total()} €
      </h2>
      <div className="payment">
        <button onClick={() => createCheckoutSession()}>Go to payment </button>
      </div>
    </div>
  );
}

export default Checkout;
