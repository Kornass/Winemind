import AdminDashBoard from "./AdminDashBoard";
import UserDashBoard from "./UserDashBoard";
import NotActiveDash from "./NotActiveDash";

function UserAccount({ user, setUser }) {
  return (
    <>
      {user?.admin ? (
        <AdminDashBoard user={user} />
      ) : user.active ? (
        <UserDashBoard user={user} setUser={setUser} />
      ) : (
        <NotActiveDash />
      )}
    </>
  );
}
export default UserAccount;
