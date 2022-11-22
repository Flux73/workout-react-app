import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${styles.form__row}`}>
      <label className={`${styles.form__label}`}>{props.label}</label>
      {props.children}
    </div>
  );
};

export default Input;
