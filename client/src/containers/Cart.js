import { Link } from "react-router-dom";
function Cart({ cart, onAdd, onRemove, setCart, showCart }) {
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const removeItem = (item) => {
    let cartCopy = [...cart];
    cartCopy.splice(item, 1);
    setCart(cartCopy);
  };

  return (
    <>
      <h1 className="cartTitle">CART</h1>
      <button onClick={() => showCart()}>Close cart</button>
      <div>{cart.length === 0 && <div>Cart is empty</div>}</div>
      {cart.map((ele, i) => {
        return (
          <div key={i}>
            <p>
              {ele.name}
              <button onClick={() => removeItem(i)}>x</button>
            </p>

            <button onClick={() => onAdd(ele)}>+</button>
            <button onClick={() => onRemove(ele)}>-</button>
            <p>
              {ele.qty} x {ele.price}€
            </p>
          </div>
        );
      })}
      {cart.length !== 0 && (
        <>
          <hr></hr>
          <div className="row">
            <div className="col-2">Items Price</div>
            <div className="col-1 text-right">{itemsPrice.toFixed(2)}€</div>
          </div>
          <div className="row">
            <div className="col-2">Shipping Price (free from 100€)</div>
            <div className="col-1 text-right">{shippingPrice.toFixed(2)}€</div>
          </div>

          <div className="row">
            <div className="col-2">
              <strong>Total Price</strong>
            </div>
            <div className="col-1 text-right">
              <strong>{totalPrice.toFixed(2)}€</strong>
            </div>
          </div>
          <hr />
          <div className="row">
            <button>Checkout</button>
          </div>
        </>
      )}
    </>
  );
}
export default Cart;
