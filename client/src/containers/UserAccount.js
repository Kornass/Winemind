import AdminDashBoard from "./AdminDashBoard";
import UserDashBoard from "./UserDashBoard";

function UserAccount({ user, setUser }) {
  return (
    <>
      {user?.admin ? (
        <AdminDashBoard user={user} />
      ) : (
        <UserDashBoard user={user} setUser={setUser} />
      )}
    </>
  );
}
export default UserAccount;
