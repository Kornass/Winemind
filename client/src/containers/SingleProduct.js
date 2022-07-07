import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleProduct({ allProd, onAdd }) {
  const [product, setProduct] = useState({});

  let params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);

    let findProduct = () => {
      const idx = allProd.findIndex((item) => item.sku === params.sku);
      setProduct(allProd[idx]);
    };
    allProd.length > 0 && findProduct();
  }, [allProd]);

  return (
    <div className="singleProdDiv">
      <div className="imagediv">
        <img
          className="singleImg"
          src={product.img}
          alt={`${product.name} bottle`}
        />
      </div>
      <div className="descriptionDiv">
        <h1>{product.name}</h1>
        <p>{product.type} wine</p>
        <p>
          <span className="bold">Year: </span> {product.vintage}
        </p>
        <p>
          <span className="bold">Grape: </span>
          {product.grape}
        </p>
        <p>
          <span className="bold">Producer: </span>
          {product.producer}
        </p>
        <p>
          <span className="bold">Country: </span>
          {product.country}
        </p>
        <p>
          <span className="bold">Region: </span> {product.region}
        </p>
        <p>{product.description}</p>
        <h1>{product.price}€</h1>
        <button onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </div>
  );
}
export default SingleProduct;
