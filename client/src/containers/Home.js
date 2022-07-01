import Filtering from "../components/Filtering";
import AllProducts from "../components/AllProducts";

function Home({ allProd, toDisplay, setToDisplay, onAdd }) {
  return (
    <>
      <Filtering
        toDisplay={toDisplay}
        allProd={allProd}
        setToDisplay={setToDisplay}
      />
      <AllProducts toDisplay={toDisplay} onAdd={onAdd} />
    </>
  );
}
export default Home;
