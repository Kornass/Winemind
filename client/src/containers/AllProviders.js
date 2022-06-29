import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../config";

function AllProviders() {
  //   const [updated, setUpdated] = useState({
  //     name: user.name,
  //     eMail: user.eMail,
  //     companyName: user.companyName,
  //     image: user.image,
  //     active: user.active,
  //   });
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
  const updateUser = (provider) => {
    console.log(provider, provider.active);
    let url = `${URL}/user/${provider.name}/update`;
    axios
      .post(url, {
        oldName: provider.name,
        name: provider.name,
        eMail: provider.eMail,
        companyName: provider.companyName,
        image: provider.image,
        active: provider.active,
      })
      .then((res) => {});
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
                          onChange={updateUser}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          onChange={() => updateUser(provider)}
                        />
                      )}
                    </div>
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
