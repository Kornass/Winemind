import AdminDashBoard from "./AdminDashBoard";
import UserDashBoard from "./UserDashBoard";

function UserAccount({ user }) {
  return (
    <>{user?.admin ? <AdminDashBoard /> : <UserDashBoard user={user} />}</>
  );
}
export default UserAccount;
