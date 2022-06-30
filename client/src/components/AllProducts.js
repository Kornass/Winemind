import axios from "axios";
import { useEffect } from "react";
import { URL } from "../config";
import { Link } from "react-router-dom";

function AllProducts({ allProd, setAllProd, onAdd }) {
  // Fetching all products
  const AllProducts = async () => {
    let url = `${URL}/product/all`;
    try {
      const res = await axios.get(url);
      setAllProd(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    AllProducts();
  }, []);
  const displayProducts = () => {
    return (
      <>
        {allProd &&
          allProd.map((item, i) => (
            <div className="product" key={i}>
              <Link to={`/single/${item.sku}`} key={item._id}>
                <img src={item.img} alt={`${item.name} bottle`} />
                <p>
                  {item.name}, {item.vintage}, {item.producer}
                </p>
                <p>{item.price}</p>
              </Link>
              <button onClick={() => onAdd(item)}>Add to cart</button>
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
