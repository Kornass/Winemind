import AddProduct from "./AddProduct";
import AllProviders from "./AllProviders";
function AdminDashBoard({ user }) {
  return (
    <>
      <AllProviders user={user} />
      <AddProduct />
    </>
  );
}
export default AdminDashBoard;
