import AddProduct from "./AddProduct";
import UserProducts from "./UserProducts";
import ProviderDetails from "../components/ProviderDetails";

import { useState, useEffect } from "react";

function UserDashBoard({ user }) {
  return (
    <>
      <h2>Add product</h2>
      <AddProduct user={user} />

      <ProviderDetails user={user} />
      <h2>Your products</h2>
      <UserProducts user={user} />
    </>
  );
}
export default UserDashBoard;
