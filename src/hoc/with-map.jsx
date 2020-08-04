import React from "react";
import Map from "../components/map/map";
import {extend} from "../helpers/extend-object";

const withMap = (Component) => (props) => {
  const properties = extend({}, props);
  delete properties.mapClassName;

  return (
    <Component
      {...properties}
      renderMap={(coordinates, city, activePoint) => {
        return (
          <Map
            city={city}
            markersCoordinates={coordinates}
            activePoint={activePoint}
            className={props.mapClassName}
          />
        );
      }}
    />
  );
};

export default withMap;
