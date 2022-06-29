import Filtering from "../components/Filtering";
import AllProducts from "../components/AllProducts";

function Home({ allProd, setAllProd, onAdd }) {
  return (
    <AllProducts allProd={allProd} setAllProd={setAllProd} onAdd={onAdd} />
  );
}
export default Home;
