import Filtering from "../components/Filtering";
import AllProducts from "../components/AllProducts";
import BackgroundSlider from "react-background-slider";
import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
import carousel4 from "../images/carousel4.jpg";
import carousel5 from "../images/carousel5.jpg";

function Home({ allProd, setAllProd, toDisplay, setToDisplay, onAdd }) {
  return (
    <>
      <div className="viewport">
        <BackgroundSlider
          images={[carousel1, carousel2, carousel3, carousel4, carousel5]}
          duration={6}
          transition={2}
        />
      </div>
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
