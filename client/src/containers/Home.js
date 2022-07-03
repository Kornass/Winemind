import Filtering from "../components/Filtering";
import AllProducts from "../components/AllProducts";

function Home({ allProd, setAllProd, toDisplay, setToDisplay, onAdd }) {
  return (
    <>
      <Filtering
        toDisplay={toDisplay}
        allProd={allProd}
        // setToDisplay={setToDisplay}
        setAllProd={setAllProd}
      />
      <AllProducts toDisplay={toDisplay} allProd={allProd} onAdd={onAdd} />
    </>
  );
}
export default Home;
