import { useState } from "react";

function Search({ allProd }) {
  const [list, setList] = useState();

  const handleSearch = (e) => {
    console.log(e.target.value);
    setList(e.target.value);
  };
  const renderSearch = () => {
    return allProd.map((ele, idx) => {
      return ele.name.includes(list) ||
        ele.type.includes(list) ||
        ele.country.includes(list) ||
        ele.region.includes(list) ? (
        <div key={idx} className="prodDiv">
          <img src={ele.img} />
          <p className="title">{ele.name}</p>
          <p className="title">{ele.price}€</p>
        </div>
      ) : null;
    });
  };
  return (
    <>
      <input onChange={handleSearch} placeholder="Search..." />
      <div>{renderSearch()}</div>
    </>
  );
}

export default Search;
