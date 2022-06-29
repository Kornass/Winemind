import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import DeleteUser from "./DeteleUser";

function AllProviders() {
  const [provider, setProvider] = useState({});
  const [allProviders, setAllProviders] = useState();
  const [active, setActive] = useState();
  // console.log(provider, active);

  const getProviders = async () => {
    // debugger;
    let url = `${URL}/user/all`;
    try {
      const res = await axios.get(url);
      setAllProviders(res.data.allProviders.filter((item) => !item.admin));
    } catch (e) {
      console.log(e);
    }
  };

  const userActivate = () => {
    // debugger;
    let url = `${URL}/admin/activate`;
    axios
      .post(url, {
        toChangeUser: provider.name,
        active: active,
      })
      .then((res) => {
        console.log(res.data);
        setProvider({});
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
                <tr key={i}>
                  <td>{provider.name}</td>
                  <td>{provider.eMail}</td>
                  <td>{provider.companyName}</td>
                  <td>
                    <div className="active">
                      {provider.active ? (
                        <input
                          type="checkbox"
                          checked="checked"
                          onChange={() => {
                            setProvider(provider);
                            setActive(!provider.active);
                            userActivate();
                          }}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          onChange={() => {
                            setProvider(provider);
                            setActive(!provider.active);
                            userActivate();
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <DeleteUser
                      setAllProviders={setAllProviders}
                      provider={provider}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default AllProviders;
