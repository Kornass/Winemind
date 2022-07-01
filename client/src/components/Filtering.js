function Filtering({ allProd }) {
  return (
    <form className="filter-container">
      <div>
        <label>Wine Name</label>
        <select defaultValue="Wine Name" name="name">
          {allProd.map((e, i) => (
            <option key={`e.name, ${i}`}>{e.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Wine type</label>
        <select defaultValue="Type" name="type">
          {allProd.map((e, i) => (
            <option key={`e.type, ${i}`}>{e.type}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Grape</label>
        <select defaultValue="Grape" name="grape">
          {allProd.map((e, i) => (
            <option key={`e.grape, ${i}`}>{e.grape}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Vintage</label>

        <select defaultValue="Vintage" name="vintage">
          {allProd.map((e, i) => (
            <option key={`e.vintage, ${i}`}>{e.vintage}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Country</label>

        <select defaultValue="Country" name="country">
          {allProd.map((e, i) => (
            <option key={`e.country, ${i}`}>{e.country}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Region</label>

        <select defaultValue="Region" name="region">
          {allProd.map((e, i) => (
            <option key={`e.region, ${i}`}>{e.region}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Producer</label>

        <select defaultValue="Producer" name="producer">
          {allProd.map((e, i) => (
            <option key={`e.producer, ${i}`}>{e.producer}</option>
          ))}
        </select>
      </div>
    </form>
  );
}
export default Filtering;
