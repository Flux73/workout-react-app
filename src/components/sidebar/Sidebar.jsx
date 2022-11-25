import React, { useContext } from "react";
import Footer from "./Footer";
import { useState } from "react";
import WorkoutForm from "./form/WorkoutForm";
import Workout from "./Workout";
import { mapContext } from "../../context/map-context";

import "./Sidebar.css";

const Sidebar = (props) => {
  const ctx = useContext(mapContext);

  return (
    <div
      className={`sidebar ${props.isClicked ? "siderbar__small_screen" : null}`}
    >
      {/* <img src="logo.png" alt="Logo" className="logo" /> */}

      <ul className="workouts">
        <WorkoutForm />
        {[...ctx.workouts].reverse().map((workout, i) => {
          return (
            <Workout
              id={workout.id}
              key={i}
              type={workout.workoutType}
              icon={workout.workoutType === "running" ? "🏃‍♂️" : "🚴‍♀️"}
              speedUnit={workout.workoutType === "running" ? "min/km" : "km/h"}
              workoutDate={workout.date}
              distance={workout.distanceVal}
              duration={workout.durationVal}
              speed={workout.speedVal}
              cadence={workout.cadenceVal && workout.cadenceVal}
              elevation={workout.elevationVal && workout.elevationVal}
              description={workout.description}
            />
          );
        })}
        {/* <Workout type="Running" icon="🏃‍♂️" speedUnit="min/km" />
        <Workout type="Running" icon="🏃‍♂️" speedUnit="min/km" />
        <Workout type="Cycling" icon="🚴‍♀️" speedUnit="km/h" /> */}
      </ul>
      <Footer />
    </div>
  );
};

export default Sidebar;
