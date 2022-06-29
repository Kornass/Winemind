import AddProduct from "./AddProduct";
import UserProducts from "./UserProducts";
import ProviderDetails from "../components/ProviderDetails";

import { useState, useEffect } from "react";

function UserDashBoard({ user, setUser }) {
  return (
    <>
      <ProviderDetails user={user} setUser={setUser} />
      <AddProduct user={user} />

      <h2>Your products</h2>
      <UserProducts user={user} />
    </>
  );
}
export default UserDashBoard;
