import AddProduct from "./AddProduct";
import { useState, useEffect } from "react";
function UserDashBoard() {
  const [products, setProducts] = useState();
  return (
    <>
      <AddProduct />
    </>
  );
}
export default UserDashBoard;
