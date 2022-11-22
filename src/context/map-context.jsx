import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import months from "../global/months";

let ID_GEN = 1;

export const mapContext = React.createContext({
  isFormShown: false,
  workouts: [],
  workoutCoords: [],
  showForm: () => {},
  hideForm: () => {},
  addWorkout: () => {},
  workoutGetCoords: () => {},
});

export default (props) => {
  const [map, setMap] = useState({
    isFormShown: false,
    workouts: [],
    workoutCoords: [],
  });

  // Custom--Hook!!!
  useLocalStorage(map.workouts, (workouts) =>
    setMap((prev) => {
      return {
        ...prev,
        workouts,
      };
    })
  );

  const showForm = () =>
    setMap((prev) => {
      return { ...prev, isFormShown: true };
    });

  const hideForm = () =>
    setMap((prev) => {
      return { ...prev, isFormShown: false };
    });

  const workoutGetCoords = useCallback(
    (data) => {
      if (map.isFormShown) return;

      setMap((prev) => {
        return {
          ...prev,
          workoutCoords: [data.lat, data.lng],
        };
      });
    },
    [map.isFormShown]
  );

  const addWorkout = (data) => {
    const date = new Date();
    const description = `${data.workoutType[0].toUpperCase()}${data.workoutType.slice(
      1
    )} on ${months[date.getMonth()]} ${date.getDate()}`;
    const workout = {
      ...data,
      speedVal:
        data.workoutType === "running"
          ? (data.durationVal / data.distanceVal).toFixed(1)
          : (data.distanceVal / (data.durationVal / 60)).toFixed(1),
      date: { month: date.getMonth(), day: date.getDate() },
      coords: { lat: map.workoutCoords[0], lng: map.workoutCoords[1] },
      description,
      id: ID_GEN++,
    };

    setMap((prev) => {
      return {
        ...prev,
        workouts: [...prev.workouts, workout],
      };
    });
  };

  return (
    <mapContext.Provider
      value={{ ...map, showForm, hideForm, addWorkout, workoutGetCoords }}
    >
      {props.children}
    </mapContext.Provider>
  );
};
