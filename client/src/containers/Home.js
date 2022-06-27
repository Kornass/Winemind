import Filtering from "../components/Filtering";
import axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "../config";

function Home() {
  const [allProd, setAllProd] = useState(null);
  // Fetchin all products
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
            <div className="product" key={item._id}>
              <img src={item.img} />
              <p>
                {item.name}, {item.vintage}, {item.producer}
              </p>
              <p>{item.price}</p>
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
export default Home;
