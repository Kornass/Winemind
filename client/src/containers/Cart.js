import { Link } from "react-router-dom";
import { FaInfo, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

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
      <div className="cart-top">
        <h4>CART</h4>
        <button onClick={() => showCart()}>X</button>
      </div>
      {cart.length === 0 && <div className="empty">Cart is empty</div>}
      {cart.map((ele, i) => {
        return (
          <div key={i} className="cart-item-container">
            <div className="cart-item">
              <p>{ele.name}</p>
              <div>
                <button onClick={() => onAdd(ele)}>
                  <FaPlusCircle />
                </button>
                <button onClick={() => onRemove(ele)}>
                  <FaMinusCircle />
                </button>
              </div>
              <button onClick={() => removeItem(i)}>X</button>
            </div>
            <p>
              {ele.qty} x {ele.price}€
            </p>
          </div>
        );
      })}
      {cart.length !== 0 && (
        <>
          <div className="summary">
            <div className="row">
              <div className="prices">
                <p>Items Price </p>
                <p>{itemsPrice.toFixed(2)}€</p>
              </div>
              <div className="prices">
                <span>Shipping Price </span>
                <button>
                  <FaInfo />
                </button>
                <div className="cart-msg">Shipping free from 100€</div>
                <p>{shippingPrice.toFixed(2)}€</p>
              </div>
            </div>
            <div className="cart-total">
              <p>Total Price</p>
              <p>{totalPrice.toFixed(2)}€</p>
            </div>
          </div>
          <div className="checkout-btn">
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
export default Cart;
