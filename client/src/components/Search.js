import { useState } from "react";
import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

function Search({ allProd, onAdd }) {
  const [list, setList] = useState("");

  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      document.getElementById("searchList").style.display = "block";
    } else {
      document.getElementById("searchList").style.display = "none";
    }
    setList(e.target.value);
  };
  const resetInput = () => {
    document.getElementById("searchbar").value = "";
  };
  const renderSearch = () => {
    const filteredList = allProd.filter((ele) => {
      return (
        ele.name.toUpperCase().includes(list.toUpperCase()) ||
        ele.type.toUpperCase().includes(list.toUpperCase()) ||
        ele.grape.toUpperCase().includes(list.toUpperCase()) ||
        ele.country.toUpperCase().includes(list.toUpperCase()) ||
        ele.producer.toUpperCase().includes(list.toUpperCase()) ||
        ele.region.toUpperCase().includes(list.toUpperCase())
      );
    });
    if (filteredList.length > 0) {
      return filteredList.map((ele, idx) => {
        return (
          <div key={idx}>
            <Link
              to={`/single/${ele.sku}`}
              key={ele._id}
              onClick={() => {
                resetInput();
                handleSearch();
              }}
            >
              <div className="searchStuff">
                <img className="searchImg" src={ele.img} />
                <p className="searchTitle">{ele.name}</p>
                <p className="searchTitle">{ele.price}€</p>
              </div>
            </Link>
            <button onClick={() => onAdd(ele)}>Add to cart</button>
          </div>
        );
      });
    } else {
      return <h2>No products match this search</h2>;
    }
  };
  return (
    <>
      <input
        id="searchbar"
        className="searchbar"
        onChange={handleSearch}
        placeholder="Search..."
      />
      <div id="searchList" className="searchList">
        {renderSearch()}
      </div>
    </>
  );
}

export default Search;
