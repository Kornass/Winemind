import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import DeleteUser from "./DeteleUser";
import UserProducts from "./UserProducts";

function AllProviders() {
  const [allProviders, setAllProviders] = useState();

  const getProviders = async () => {
    let url = `${URL}/user/all`;
    try {
      const res = await axios.get(url);
      setAllProviders(res.data.allProviders.filter((item) => !item.admin));
    } catch (e) {
      console.log(e);
    }
  };

  const userActivate = (provider) => {
    let change = !provider.active;
    let url = `${URL}/admin/activate`;

    axios
      .post(url, {
        toChangeUser: provider._id,
        active: change,
        name: provider.name,
        eMail: provider.eMail,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getProviders();
  }, [allProviders]);
  return (
    <>
      <h2>All providers</h2>
      <table className="providers">
        <tbody>
          <tr>
            <th>Name</th>
            <th>e-mail</th>
            <th>Company</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
          {allProviders &&
            allProviders.map((provider, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>{provider.name}</td>
                    <td>{provider.eMail}</td>
                    <td>{provider.companyName}</td>
                    <td>
                      <div className="active">
                        <input
                          type="checkbox"
                          checked={provider.active && "checked"}
                          onChange={() => {
                            userActivate(provider);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <DeleteUser
                        setAllProviders={setAllProviders}
                        provider={provider}
                      />
                    </td>
                  </tr>
                  <tr key={provider._id} className="admin-products">
                    <td colSpan="100%">
                      <UserProducts user={provider} />
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default AllProviders;
