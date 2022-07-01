import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleProduct({ allProd, onAdd }) {
  const [product, setProduct] = useState({});
  let params = useParams();
  useEffect(() => {
    let findProduct = () => {
      const idx = allProd.findIndex((item) => item.sku === params.sku);
      setProduct(allProd[idx]);
    };
    allProd.length > 0 && findProduct();
  }, [allProd]);

  return (
    <div className="singleProdDiv">
      <h1>{product.name}</h1>
      <img
        className="singleImg"
        src={product.img}
        alt={`${product.name} bottle`}
      />
      <p>{product.type} wine</p>
      <p>Year: {product.vintage}</p>
      <p>Grape: {product.grape}</p>
      <p>Producer: {product.producer}</p>
      <p>Country: {product.country}</p>
      <p>Region: {product.region}</p>
      <p>{product.description}</p>
      <h1>{product.price}€</h1>
      <button onClick={() => onAdd(product)}>Add to cart</button>
    </div>
  );
}
export default SingleProduct;
