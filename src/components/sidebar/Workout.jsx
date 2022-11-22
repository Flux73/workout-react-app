import React from "react";
import "./Workout.css";
import months from "../../global/months";

const Workout = (props) => {
  return (
    <li
      className={`workout workout--${props.type}`}
      // data-id="1234567890"
    >
      <h2 className="workout__title">{props.description}</h2>
      <div className="workout__details">
        <span className="workout__icon">{props.icon}</span>
        <span className="workout__value">{props.distance}</span>
        <span className="workout__unit">km</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⏱</span>
        <span className="workout__value">{props.duration}</span>
        <span className="workout__unit">min</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⚡️</span>
        <span className="workout__value">{props.speed}</span>
        <span className="workout__unit">{props.speedUnit}</span>
      </div>

      {props.type === "running" ? (
        <div className="workout__details">
          <span className="workout__icon">🦶🏼</span>
          <span className="workout__value">{props.cadence}</span>

          <span className="workout__unit">spm</span>
        </div>
      ) : (
        <div className="workout__details">
          <span className="workout__icon">⛰</span>
          <span className="workout__value">{props.elevation}</span>
          <span className="workout__unit">m</span>
        </div>
      )}
    </li>
  );
};

export default Workout;
