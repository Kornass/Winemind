import json from "country-region-data/data.json";
import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [producer, setProducer] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const countryHolder = (e) => {
    setCountry(e.target.value);
  };
  const nameHolder = (e) => {
    setName(e.target.value);
  };
  const typeHolder = (e) => {
    setType(e.target.value);
  };
  const yearHolder = (e) => {
    setYear(e.target.value);
  };
  const producerHolder = (e) => {
    setProducer(e.target.value);
  };
  const regionHolder = (e) => {
    setRegion(e.target.value);
  };
  const priceHolder = (e) => {
    setPrice(e.target.value);
  };
  const descriptionHolder = (e) => {
    setDescription(e.target.value);
  };
  const imageHolder = (e) => {
    setImage(e.target.value);
  };

  const regFinder = () => {
    if (country) {
      debugger;
      let idx = json.findIndex((e) => e.countryName == country);
      return json[idx].regions.map((e, i) => <option key={i}>{e.name}</option>);
    }
  };

  const add = () => {
    let url = "http://localhost:4000/product/add";
    axios
      .post(url, {
        name: name,
        type: type,
        year: year,
        producer: producer,
        country: country,
        region: region,
        price: price,
        description: description,
        image: image,
      })
      .then((res) => {
        console.log(res.status);
        setName("");
        setType("");
        setYear("");
        setProducer("");
        setCountry("");
        setRegion("");
        setPrice("");
        setDescription("");
        setImage("");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="addform">
      <form>
        <label>Wine name</label>
        <input onChange={nameHolder} />
        <label>Type</label>
        <input onChange={typeHolder} />
        <label>Year</label>
        <input onChange={yearHolder} />
        <label>Producer</label>
        <input onChange={producerHolder} />
        <label>Country</label>
        <select onChange={countryHolder}>
          {json.map((e, i) => (
            <option key={i} value={e.countryName}>
              {e.countryName}
            </option>
          ))}
        </select>
        <label>Region</label>
        <select onChange={regionHolder}>{regFinder()}</select>
        <label>Price</label>
        <input onChange={priceHolder} />
        <label>Description</label>
        <input onChange={descriptionHolder} />
        <label>Image</label>
        <input onChange={imageHolder} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default AddProduct;
