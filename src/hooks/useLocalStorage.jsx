import React, { useEffect } from "react";

const useLocalStorage = (workouts, getWorkouts) => {
  // window.localStorage.clear();
  useEffect(() => {
    if (workouts.length === 0) {
      const gottenWorkouts = JSON.parse(
        window.localStorage.getItem("workouts")
      );

      gottenWorkouts?.length !== 0 && getWorkouts(gottenWorkouts);
    }

    window.localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);
};

export default useLocalStorage;
