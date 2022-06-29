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
          allProd.map((item) => (
            <Link to={`/single/${item._id}`} key={item._id}>
              <div className="product">
                <img src={item.img} alt={`${item.name} bottle`} />
                <p>
                  {item.name}, {item.vintage}, {item.producer}
                </p>
                <p>{item.price}</p>
                <button onClick={() => onAdd(item)}>Add to cart</button>
              </div>
            </Link>
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
