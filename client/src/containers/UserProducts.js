import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

function UserProducts({ user }) {
  const [products, setProducts] = useState(null);
  const providerProducts = async () => {
    // debugger;
    let url = `${URL}/product/${user.name}/products`;
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    providerProducts();
  }, [products]);

  return (
    <div className="products-container">
      {products &&
        products.map((item) => (
          <div className="product" key={item._id}>
            <img src={item.img} />
            <p>
              {item.name}, {item.vintage}, {item.producer}
            </p>
            <p>{item.price}</p>
          </div>
        ))}
    </div>
  );
}

export default UserProducts;
