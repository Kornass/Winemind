import { FaEdit } from "react-icons/fa";
import json from "country-region-data/data.json";

import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

function EditUser({ item }) {
  const [form, setForm] = useState({
    name: item.name,
    type: item.type,
    grape: item.grape,
    vintage: item.vintage,
    country: item.country,
    region: item.region,
    producer: item.producer,
    price: item.price,
    description: item.description,
    img: item.img,
    sku: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
    console.log(form);
  }

  useEffect(() => {
    let idx = json.findIndex((e) => e.countryName === form.country);
    setForm({ ...form, region: json[idx].regions[0].name });
  }, [form.country]);

  const regFinder = () => {
    if (form.country) {
      let idx = json.findIndex((e) => e.countryName === form.country);
      return json[idx].regions.map((e, i) => <option key={i}>{e.name}</option>);
    }
  };

  const handleChange = (e) => {
    // e.target.name == name &&
    //   setForm({ ...form, [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = () => {
    debugger;
    let url = `${URL}/product/update`;
    axios
      .post(url, { oldProduct: item._id, updatedProduct: form })
      .then((res) => {
        console.log(res.data);
        toggleModal();
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
      <button className="edit" onClick={toggleModal}>
        <FaEdit color="orange" />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Update Product"
        overlayClassName="myoverlay"
        className="myModal"
      >
        <div className="modal">
          <button onClick={toggleModal} className="close">
            X
          </button>

          <form onSubmit={updateProduct} onChange={handleChange}>
            <label>Wine name *</label>
            <input required name="name" defaultValue={form.name} />
            <label>Type *</label>
            <select defaultValue="red" required>
              {types.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <label>Grape *</label>
            <input required defaultValue={form.grape} name="grape" />
            <label>Year *</label>
            <input
              name="year"
              minLength="4"
              maxLength="4"
              required
              defaultValue={form.vintage}
            />
            <label>Producer *</label>
            <input name="producer" required defaultValue={form.producer} />
            <label>Country *</label>
            <select name="country" defaultValue={form.countryName} required>
              {json.map((e, i) => (
                <option key={i} value={e.countryName}>
                  {e.countryName}
                </option>
              ))}
            </select>
            <label>Region *</label>
            <select name="region" defaultValue={form.region} required>
              {regFinder()}
            </select>
            <label>Price (in euros) *</label>
            <input
              name="price"
              type="Number"
              required
              defaultValue={form.price}
            />
            <label>Description</label>
            <input name="description" defaultValue={form.description} />
            <label>Image URL *</label>
            <input
              // type="file"
              name="img"
              required
              defaultValue={form.img}
            />
            <input type="submit" value="Add" />
          </form>
          <div className="msg-login"></div>
        </div>
      </Modal>
    </>
  );
}

export default EditUser;
