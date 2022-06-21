import json from "country-region-data/data.json";
import { useState } from "react";
import axios from "axios";
import { URL } from "../config";

function AddProduct() {
  const [product, setProduct] = useState({
    wineName: "",
    type: "",
    vintage: "",
    country: "",
    region: "",
    producer: "",
    price: "",
    description: "",
    img: "",
  });

  const regFinder = () => {
    if (product.country) {
      let idx = json.findIndex((e) => e.countryName == product.country);
      return json[idx].regions.map((e, i) => <option key={i}>{e.name}</option>);
    }
  };

  const add = (e) => {
    e.preventDefault();

    let url = `${URL}/product/add`;
    axios
      .post(url, {
        wineName: product.wineName,
        type: product.type,
        vintage: product.vintage,
        producer: product.producer,
        country: product.country,
        region: product.region,
        price: product.price,
        description: product.description,
        img: product.img,
      })
      .then((res) => {
        e.target.reset();
        console.log(res.status);
        setProduct({
          wineName: "",
          type: "",
          vintage: "",
          country: "",
          region: "",
          producer: "",
          price: "",
          description: "",
          img: "",
        });

        alert("Product was added successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="addform">
      <form onSubmit={add}>
        <label>Wine name</label>
        <input
          required
          name="wineName"
          onChange={(e) => setProduct({ ...product, wineName: e.target.value })}
        />
        <label>Type</label>
        <input
          required
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
        />
        <label>Year</label>
        <input
          required
          onChange={(e) => setProduct({ ...product, vintage: e.target.value })}
        />
        <label>Producer</label>
        <input
          required
          onChange={(e) => setProduct({ ...product, producer: e.target.value })}
        />
        <label>Country</label>
        <select
          required
          onChange={(e) => setProduct({ ...product, country: e.target.value })}
        >
          {json.map((e, i) => (
            <option key={i} value={e.countryName}>
              {e.countryName}
            </option>
          ))}
        </select>
        <label>Region</label>
        <select
          required
          onChange={(e) => setProduct({ ...product, region: e.target.value })}
        >
          {regFinder()}
        </select>
        <label>Price</label>
        <input
          required
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <label>Description</label>
        <input
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <label>Image</label>
        <input
          required
          onChange={(e) => setProduct({ ...product, img: e.target.value })}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default AddProduct;
