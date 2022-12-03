import React, { useEffect, useState, useContext } from "react";
import "./Map.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  useMapEvent,
} from "react-leaflet";
import { mapContext } from "../../context/map-context";
import months from "../../global/months";
import { useRef } from "react";
import Markers from "./Markers";

const mapStyles = {
  height: "100%",
};

const ChangeWorkoutView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (!coords.length > 0) return;
    map.flyTo(coords, 13);
  }, [coords]);
  return null;
};

const ChangeMapView = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords]);

  return null;
};

const ClickHandler = () => {
  const mapCTX = useContext(mapContext);
  const map = useMap();

  useEffect(() => {
    map.on("click", (e) => {
      mapCTX.workoutGetCoords(e.latlng);
      mapCTX.showForm();
    });

    return () => map.removeEventListener("click");
  }, [map, mapCTX.workoutGetCoords]);

  return null;
};

const Map = (props) => {
  const [coords, setCoords] = useState([51.505, -0.09]);
  const [isChanged, setIsChanged] = useState(false);
  const [clickedWorkoutCoords, setClickedWorkoutCoords] = useState([]);
  const mapCTX = useContext(mapContext);

  useEffect(() => {
    if (!mapCTX.clickedWorkoutCoords.length > 0) return;
    setClickedWorkoutCoords(mapCTX.clickedWorkoutCoords);
    // mapCTX.clear();
  }, [mapCTX.clickedWorkoutCoords]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setCoords([location.coords.latitude, location.coords.longitude]);
        setIsChanged(true);
      },
      () => {
        console.log("Can't get it");
      }
    );
  }, []);

  return (
    <div id="map">
      <MapContainer
        style={mapStyles}
        center={coords}
        zoom={13}
        closePopupOnClick={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers workouts={mapCTX.workouts} />
        <ClickHandler />
        {clickedWorkoutCoords.length > 0 && (
          <ChangeWorkoutView coords={clickedWorkoutCoords} />
        )}
        {isChanged && <ChangeMapView coords={coords} />}
      </MapContainer>
    </div>
  );
};

export default Map;
