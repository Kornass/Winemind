import { useState } from "react";

function Checkout({ cart }) {
  const changeQuantity = (e) => {
    console.log(e);
  };

  return (
    <div className="container">
      <h3>Checkout</h3>
      {cart.map((e, i) => {
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
      <div className="payment">
        <button>Go to payment</button>
      </div>
    </div>
  );
}

export default Checkout;
