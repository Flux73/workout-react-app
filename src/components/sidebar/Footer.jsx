import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.copyright}>
      &copy; Created by{" "}
      <a
        className={styles["github-link"]}
        target="_blank"
        href="https://github.com/Flux73"
      >
        Salah Moumni
      </a>
    </footer>
  );
};

export default Footer;
