import json from "country-region-data/data.json";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

function AddProduct({ user }) {
  // console.log(user);
  const [product, setProduct] = useState({
    wineName: "",
    type: "Red",
    vintage: "",
    provider_id: user._id,
    country: json[0].countryName,
    region: "Badakhshan",
    producer: "",
    price: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    let idx = json.findIndex((e) => e.countryName === product.country);
    setProduct({ ...product, region: json[idx].regions[0].name });
  }, [product.country]);

  const regFinder = () => {
    if (product.country) {
      let idx = json.findIndex((e) => e.countryName === product.country);
      return json[idx].regions.map((e, i) => <option key={i}>{e.name}</option>);
    }
  };

  const add = (e) => {
    console.log(user);
    e.preventDefault();
    let url = `${URL}/product/add`;
    axios
      .post(url, {
        wineName: product.wineName,
        type: product.type,
        vintage: product.vintage,
        provider_id: user._id,
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
          type: "Red",
          vintage: "",
          provider_id: user._id,
          country: json[0].countryName,
          region: "Badakhshan",
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

  const types = [
    "Red",
    "White",
    "Rosé",
    "Sparkling red",
    "Sparkling white",
    "Sparkling rosé",
    "Dessert",
    "Non-alcoholic",
    "Others",
  ];

  return (
    <>
      <h2>Add product</h2>
      <div className="addform">
        <form onSubmit={add}>
          <label>Wine name *</label>
          <input
            required
            name="wineName"
            onChange={(e) =>
              setProduct({ ...product, wineName: e.target.value })
            }
          />
          <label>Type *</label>
          <select
            defaultValue="Red"
            required
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
          >
            {types.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
          <label>Year *</label>
          <input
            type="Number"
            min="1900"
            max={new Date().getFullYear()}
            required
            onChange={(e) =>
              setProduct({ ...product, vintage: e.target.value })
            }
          />
          <label>Producer *</label>
          <input
            required
            onChange={(e) =>
              setProduct({ ...product, producer: e.target.value })
            }
          />
          <label>Country *</label>
          <select
            defaultValue={json[0].countryName}
            required
            onChange={(e) =>
              setProduct({ ...product, country: e.target.value })
            }
          >
            {json.map((e, i) => (
              <option key={i} value={e.countryName}>
                {e.countryName}
              </option>
            ))}
          </select>
          <label>Region *</label>
          <select
            defaultValue={product.region}
            required
            onChange={(e) => setProduct({ ...product, region: e.target.value })}
          >
            {regFinder()}
          </select>
          <label>Price (in euros) *</label>
          <input
            min={0}
            type="Number"
            required
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <label>Description</label>
          <textarea
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <label>Image URL *</label>
          <input
            // type="file"
            required
            onChange={(e) => setProduct({ ...product, img: e.target.value })}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
}

export default AddProduct;
