import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import { FaTimes } from "react-icons/fa";
import EditUser from "./EditProduct";

function UserProducts({ user }) {
  const [products, setProducts] = useState([]);

  const providerProducts = async () => {
    // debugger;
    let url = `${URL}/product/${user._id}/products`;
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

  const handleDelete = (_id) => {
    let url = `${URL}/product/delete`;
    axios.post(url, {
      _id: _id,
    });
  };

  return (
    <div className="products-container">
      {products &&
        products.map((item) => (
          <div className="product" key={item._id}>
            <button
              className="delete"
              id={item._id}
              onClick={() => handleDelete(item._id)}
            >
              {item.id}
              <FaTimes color="orange" />
            </button>
            {/* </button>
            <button className="edit">
              <FaEdit color="orange" />
            </button> */}
            <EditUser item={item} />
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
