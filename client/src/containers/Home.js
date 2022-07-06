import Filtering from "../components/Filtering";
import AllProducts from "../components/AllProducts";
import BackgroundSlider from "react-background-slider";

import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";
import slider4 from "../images/slider4.jpg";
import slider5 from "../images/slider5.jpg";

function Home({ allProd, setAllProd, toDisplay, setToDisplay, onAdd }) {
  return (
    <>
      <div className="view-viewport">
        <BackgroundSlider
          images={[slider1, slider2, slider3, slider4, slider5]}
          duration={6}
          transition={1}
        />
      </div>
      <div className="view-home">
        <Filtering
          toDisplay={toDisplay}
          allProd={allProd}
          // setToDisplay={setToDisplay}
          setAllProd={setAllProd}
        />
        <AllProducts toDisplay={toDisplay} allProd={allProd} onAdd={onAdd} />
      </div>
    </>
  );
}
export default Home;
