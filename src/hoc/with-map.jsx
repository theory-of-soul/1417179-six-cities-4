import React from "react";
import Map from "../components/map/map";

const withMap = (Component) => (props) => {
  return (
    <Component
      {...props}
      renderMap={(coordinates, city) => {
        return <Map city={city} markersCoordinates={coordinates}/>;
      }}
    />
  );
};

export default withMap;
