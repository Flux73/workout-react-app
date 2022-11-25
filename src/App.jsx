import Sidebar from "./components/sidebar/Sidebar";
import NavBar from "./components/sidebar/NavBar";
import Map from "./components/map/Map";
import { useState } from "react";

const App = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleSiderbarHandler = () => {
    setIsClicked((prev) => !prev);
  };
  return (
    <>
      <NavBar toggleSiderbarHandler={toggleSiderbarHandler} />
      <Sidebar isClicked={isClicked} />
      <Map />
    </>
  );
};

export default App;
