import AddProduct from "../components/AddProduct";
import UserProducts from "../components/UserProducts";
import ProviderDetails from "../components/ProviderDetails";

function UserDashBoard({ user, setUser }) {
  console.log(user);
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
