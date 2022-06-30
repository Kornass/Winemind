import AddProduct from "../components/AddProduct";

import AllProviders from "../components/AllProviders";

function AdminDashBoard({ user }) {
  return (
    <>
      <AllProviders />
      <AddProduct user={user} />
    </>
  );
}
export default AdminDashBoard;
