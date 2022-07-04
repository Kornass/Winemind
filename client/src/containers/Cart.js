function Cart({ cart, onAdd, onRemove }) {
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const removeItem = (item) => {
    debugger;
    for (let i = 0; i < item.qty; i++) {
      onRemove(item);
    }
  };

  return (
    <>
      <h1>CART COMPONENT</h1>
      <div>{cart.length === 0 && <div>Cart is empty</div>}</div>
      {cart.map((ele, i) => {
        return (
          <div key={i}>
            <p>
              {ele.name}
              <button onClick={() => removeItem(ele)}>x</button>
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
            <div className="col-2">Shipping Price</div>
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
            <button onClick={() => alert("Implement Checkout!")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default Cart;
