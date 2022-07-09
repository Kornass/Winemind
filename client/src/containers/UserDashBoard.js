import AddProduct from "../components/AddProduct";
import UserProducts from "../components/UserProducts";
import ProviderDetails from "../components/ProviderDetails";

function UserDashBoard({ user, setUser }) {
  return (
    <div className="container">
      <ProviderDetails user={user} setUser={setUser} />
      <AddProduct user={user} />

      <h3>Your products</h3>
      <UserProducts user={user} />
    </div>
  );
}
export default UserDashBoard;
