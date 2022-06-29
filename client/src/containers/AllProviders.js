import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

function AllProviders() {
  const [active, setActive] = useState(false);
  const [allProviders, setAllProviders] = useState();
  // const []

  const getProviders = async () => {
    let url = `${URL}/user/all`;
    try {
      const res = await axios.get(url);
      setAllProviders(res.data.allProviders.filter((item) => !item.admin));
    } catch (e) {
      console.log(e);
    }
  };

  const userActivate = (id) => {
    // console.log(id);
    let url = `${URL}/admin/activate`;
    axios
      .post(url, { toChangeUser: id, active: active })
      .then((res) => {
        console.log(res);
        setActive(!active);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getProviders();
  }, []);
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
                      Active
                      {provider.active ? (
                        <input
                          type="checkbox"
                          checked="checked"
                          onChange={() => userActivate(provider._id)}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          onChange={() => userActivate(provider._id)}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <button>X</button>
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
