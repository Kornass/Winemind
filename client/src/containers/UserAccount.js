import AdminDashBoard from "./AdminDashBoard";
import UserDashBoard from "./UserDashBoard";

function UserAccount({ user }) {
  console.log(user);
  return <>{user?.admin ? <AdminDashBoard /> : <UserDashBoard />}</>;
}
export default UserAccount;
