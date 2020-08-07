import React from "react";
import PlaceCardList from "../components/place-card-list/place-card-list";
import {extend} from "../helpers/extend-object";

const withPlaceCardList = (Component) => (props) => {
  const properties = extend({}, props);
  delete properties.placeListClassName;
  delete properties.onActiveHandler;

  return (
    <Component
      {...properties}
      renderPlaces={(placeList, onClickCardTitle) => {
        return (
          <PlaceCardList
            placeList={placeList}
            onClickCardTitle={onClickCardTitle}
            className={props.placeListClassName}
            onActiveHandler={props.onActiveHandler}
            addToFavorites={props.addToFavorites}
          />
        );
      }}
    />
  );
};

export default withPlaceCardList;
