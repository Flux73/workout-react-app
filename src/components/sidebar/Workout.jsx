import React from "react";
import "./Workout.css";
import months from "../../global/months";
import { mapContext } from "../../context/map-context";
import { useContext } from "react";

const Workout = (props) => {
  const mapCTX = useContext(mapContext);

  const getClickedWorkoutCoords = (e) => {
    mapCTX.storeClickedWorkoutCoords(+e.currentTarget.dataset.id);
  };

  return (
    <li
      className={`workout workout--${props.type}`}
      data-id={props.id}
      onClick={getClickedWorkoutCoords}
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
