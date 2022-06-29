import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import { FaTimes, FaEdit } from "react-icons/fa";

function UserProducts({ user }) {
  const [products, setProducts] = useState([]);
  const [toUpdate, setToUpdate] = useState(false);
  const [toRemove, setToRemove] = useState("");

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

  const handleDelete = (id) => {
    setToRemove();
    // const answer = window.confirm("You sure?");
    // answer &&
    console.log(id);
  };

  // const handleDeleteClick = () => {};

  return (
    <div className="products-container">
      {products &&
        products.map((item) => (
          <div className="product" key={item._id}>
            <button className="delete" id={item._id} onClick={handleDelete}>
              {item.id}
              <FaTimes color="orange" />
            </button>
            <button className="edit">
              <FaEdit color="orange" />
            </button>
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
