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

const mapStyles = {
  height: "100%",
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

    return () => map.removeEventListener();
  }, [map, mapCTX.workoutGetCoords]);
  // const map = useMapEvent("click", (e) => {
  //   mapCTX.workoutGetCoords(e.latlng);
  //   mapCTX.showForm();
  // });

  return null;
};

const Map = (props) => {
  const [coords, setCoords] = useState([51.505, -0.09]);
  const [isChanged, setIsChanged] = useState(false);
  const mapCTX = useContext(mapContext);
  const popupRefs = [];

  useEffect(() => {
    window.addEventListener("load", () => {
      popupRefs.length > 0 && popupRefs.map((popup) => popup?.openPopup());
    });

    return () => window.removeEventListener("load", () => {});
  });

  useEffect(() => {
    [...popupRefs]?.pop()?.openPopup();
  }, [mapCTX.workouts]);

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapCTX.workouts.map((el, i) => (
          <Marker
            ref={(ref) => (popupRefs[i] = ref)}
            key={i}
            position={[el.coords.lat, el.coords.lng]}
          >
            <Popup
              autoClose={false}
              className={
                el.workoutType === "running" ? "running-popup" : "cycling-popup"
              }
            >
              {`${el.workoutType === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${
                el.description
              }`}
            </Popup>
          </Marker>
        ))}
        <ClickHandler />
        {isChanged && <ChangeMapView coords={coords} />}
      </MapContainer>
    </div>
  );
};

export default Map;
