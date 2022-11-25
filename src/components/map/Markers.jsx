import React, { useEffect, memo } from "react";
import { Marker, Popup } from "react-leaflet";

const Markers = ({ workouts }) => {
  const popupRefs = [];

  useEffect(() => {
    window.addEventListener("load", () => {
      popupRefs.length > 0 && popupRefs.map((popup) => popup?.openPopup());
    });

    return () => window.removeEventListener("load", () => {});
  });

  useEffect(() => {
    [...popupRefs]?.pop()?.openPopup();
  }, [workouts]);

  return (
    <div>
      {workouts.map((el, i) => (
        <Marker
          ref={(ref) => (popupRefs[i] = ref)}
          key={el.id}
          position={[el.coords.lat, el.coords.lng]}
        >
          <Popup
            autoClose={false}
            className={
              el.workoutType === "running" ? "running-popup" : "cycling-popup"
            }
          >
            {`${el.workoutType === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${el.description}`}
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default memo(Markers);
