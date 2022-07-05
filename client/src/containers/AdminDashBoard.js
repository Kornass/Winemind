import AddProduct from "../components/AddProduct";

import AllProviders from "../components/AllProviders";

function AdminDashBoard({ user }) {
  console.log(window.location.href);
  return (
    <div className="container">
      <AllProviders />
      <AddProduct user={user} />
    </div>
  );
}
export default AdminDashBoard;
