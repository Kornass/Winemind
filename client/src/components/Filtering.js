import { useState } from "react";
import AllProducts from "./AllProducts";
import axios from "axios";
import { URL } from "../config";

function Filtering({ allProd, setToDisplay, setAllProd }) {
  const handleFiltering = (e) => {
    setAllProd(allProd.filter((x) => x[`${e.target.name}`] == e.target.value));
  };
  const AllProducts = async () => {
    let url = `${URL}/product/all`;
    try {
      const res = await axios.get(url);
      setAllProd(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="filter-container" onChange={handleFiltering}>
      <div>
        <select name="name" defaultValue="Wine Name">
          <option disabled hidden>
            Wine Name
          </option>
          {allProd
            .map((e, i) => e.name)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="type" defaultValue="Wine Type">
          <option disabled hidden>
            Wine Type
          </option>
          {allProd
            .map((e, i) => e.type)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="grape" defaultValue="Grapes">
          <option disabled hidden>
            Grapes
          </option>
          {allProd
            .map((e, i) => e.grape)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="vintage" defaultValue="Vintage">
          <option disabled hidden>
            Vintage
          </option>
          {allProd
            .map((e, i) => e.vintage)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="country" defaultValue="Country">
          <option disabled hidden>
            Country
          </option>
          {allProd
            .map((e, i) => e.country)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="region" defaultValue="Region">
          <option disabled hidden>
            Region
          </option>
          {allProd
            .map((e, i) => e.region)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <div>
        <select name="producer" defaultValue="Producer">
          <option disabled hidden>
            Producer
          </option>
          {allProd
            .map((e, i) => e.producer)
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((e, i) => (
              <option key={`name, ${i}`} value={e}>
                {e}
              </option>
            ))}
        </select>
      </div>
      <input value="clear" type="reset" onClick={AllProducts} />
    </form>
  );
}
export default Filtering;
