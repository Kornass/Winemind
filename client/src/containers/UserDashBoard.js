import AddProduct from "./AddProduct";
import UserProducts from "./UserProducts";
import ProviderDetails from "../components/ProviderDetails";
import { useState, useEffect } from "react";

function UserDashBoard({ user }) {
  return (
    <>
      <AddProduct user={user} />
      <ProviderDetails user={user} />
      <UserProducts user={user} />
    </>
  );
}
export default UserDashBoard;
