import React, { useContext, useRef, useState } from "react";
import { mapContext } from "../../../context/map-context";
import Input from "./Input";

import styles from "./WorkoutForm.module.css";

const isValidInputs = (...inputs) => {
  if (inputs.every((inp) => Number.isFinite(inp) === true && inp !== 0))
    return true;

  return false;
};

const WorkoutForm = (props) => {
  const [workoutType, setWorkoutType] = useState("running");

  const distance = useRef();
  const duration = useRef();
  const cadence = useRef();
  const elevation = useRef();

  const mapCTX = useContext(mapContext);

  const changeWorkoutType = (e) => {
    setWorkoutType(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const distanceVal = +distance.current.value;
    const durationVal = +duration.current.value;
    const cadenceVal = +cadence?.current?.value ?? "";
    const elevationVal = +elevation?.current?.value ?? "";

    distance.current.value = "";
    duration.current.value = "";
    workoutType === "running"
      ? (cadence.current.value = "")
      : (elevation.current.value = "");

    if (
      !isValidInputs(
        distanceVal,
        durationVal,
        workoutType === "running" ? cadenceVal : elevationVal
      )
    ) {
      return;
    }

    mapCTX.addWorkout({
      distanceVal,
      durationVal,
      workoutType,
      ...(workoutType === "running" ? { cadenceVal } : { elevationVal }),
    });
    mapCTX.hideForm();
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`${styles.form} ${!mapCTX.isFormShown ? styles.hidden : ""}`}
    >
      <Input label="Type">
        <select
          onChange={changeWorkoutType}
          className={`${styles.form__input} ${styles["form__input--type"]}`}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </Input>
      <Input label="Distance">
        <input
          ref={distance}
          className={`${styles.form__input} ${styles["form__input--distance"]}`}
          placeholder="km"
        />
      </Input>
      <Input label="Duration">
        <input
          ref={duration}
          className={`${styles.form__input} ${styles["form__input--duration"]}`}
          placeholder="min"
        />
      </Input>
      {workoutType === "running" ? (
        <Input label="Cadence">
          <input
            ref={cadence}
            className={`${styles.form__input} ${styles["form__input--cadence"]}`}
            placeholder="step/min"
          />
        </Input>
      ) : (
        <Input label="Elev Gain">
          <input
            ref={elevation}
            className={`${styles.form__input} ${styles["form__input--elevation"]}`}
            placeholder="meters"
          />
        </Input>
      )}
      <button className={`${styles.form__btn}`}>OK</button>
    </form>
  );
};

export default WorkoutForm;
