import React from "react";
import Map from "../components/map/map";

const withMap = (Component) => (props) => {
  return (
    <Component
      {...props}
      renderMap={(coordinates, city, activePoint) => {
        return (
          <Map
            city={city}
            markersCoordinates={coordinates}
            activePoint={activePoint}
          />
        );
      }}
    />
  );
};

export default withMap;
