import React from "react";

import styles from "./navBar.module.css";
import openSvg from "../../assets/menu-outline.svg";
import closeSvg from "../../assets/close-outline.svg";
import { useState } from "react";

const NavBar = (props) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
    props.toggleSiderbarHandler();
  };
  return (
    <div className={styles.nav} onClick={toggleHandler}>
      {!toggle && <img src={openSvg} alt="open icon" />}
      {toggle && <img src={closeSvg} alt="close icon" />}
    </div>
  );
};

export default NavBar;
