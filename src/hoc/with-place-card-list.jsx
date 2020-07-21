import React from "react";
import withActiveItem from "./with-active-item";
import PlaceCardList from "../components/place-card-list/place-card-list";
import {extend} from "../helpers/extend-object";

const PlaceCardListWithActiveItem = withActiveItem(PlaceCardList);

const withPlaceCardList = (Component) => (props) => {
  const properties = extend({}, props);
  delete properties.placeListClassName;

  return (
    <Component
      {...properties}
      renderPlaces={(placeList, onClickCardTitle) => {
        return (
          <PlaceCardListWithActiveItem
            placeList={placeList}
            onClickCardTitle={onClickCardTitle}
            className={props.placeListClassName}
          />
        );
      }}
    />
  );
};

export default withPlaceCardList;
