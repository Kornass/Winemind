import { useState } from "react";

function Filtering({ allProd, toDisplay, setToDisplay }) {
  const handleFiltering = (e) => {
    // debugger;
    setToDisplay(
      allProd.filter((x) => x[`${e.target.name}`] === e.target.value)
    );
  };

  return (
    <form className="filter-container" onChange={handleFiltering}>
      <div>
        <select name="name" defaultValue="Wine Name">
          <option disabled hidden>
            Wine Name
          </option>
          {allProd.map((e, i) => (
            <option key={`name, ${i}`} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="type" defaultValue="Wine Type">
          <option disabled hidden>
            Wine Type
          </option>
          {allProd.map((e, i) => (
            <option key={`type, ${i}`} value={e.type}>
              {e.type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="grape" defaultValue="Grapes">
          <option disabled hidden>
            Grapes
          </option>
          {allProd.map((e, i) => (
            <option key={`grape, ${i}`} value={e.grape}>
              {e.grape}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="vintage" defaultValue="Vintage">
          <option disabled hidden>
            Vintage
          </option>
          {allProd.map((e, i) => (
            <option key={`vintage, ${i}`} value={e.vintage}>
              {e.vintage}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="country" defaultValue="Country">
          <option disabled hidden>
            Country
          </option>
          {allProd.map((e, i) => (
            <option key={`country, ${i}`} value={e.country}>
              {e.country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="region" defaultValue="Region">
          <option disabled hidden>
            Region
          </option>
          {allProd.map((e, i) => (
            <option key={`region, ${i}`} value={e.region}>
              {e.region}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="producer" defaultValue="Producer">
          <option disabled hidden>
            Producer
          </option>
          {allProd.map((e, i) => (
            <option key={`producer, ${i}`} value={e.producer}>
              {e.producer}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
export default Filtering;
