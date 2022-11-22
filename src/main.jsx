import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";

import MapProvider from "./context/map-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MapProvider>
    <App />
  </MapProvider>
);
