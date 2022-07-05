import { Link } from "react-router-dom";

function AllProducts({ toDisplay, onAdd, allProd }) {
  const displayProducts = () => {
    return (
      <>
        {allProd &&
          allProd.map((item, i) => (
            <div className="product" key={i}>
              <Link
                to={`/single/${item.sku}`}
                key={item._id}
                className="product-link"
              >
                <img src={item.img} alt={`${item.name} bottle`} />
                <div className="info">
                  <p className="desc">
                    {item.name},{item.vintage},{item.producer}
                  </p>
                  <p>{item.price}€</p>
                </div>
              </Link>
              <button className="add-to-cart" onClick={() => onAdd(item)}>
                Add to cart
              </button>
            </div>
          ))}
      </>
    );
  };
  return (
    <>
      <div className="main">
        <div className="products-container">{displayProducts()}</div>
      </div>
    </>
  );
}

export default AllProducts;
