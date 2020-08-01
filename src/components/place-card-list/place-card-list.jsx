import React from "react";
import PropTypes from 'prop-types';
import CitiesPlaceCard from "../cities-place-card/cities-place-card";

const PlaceCardList = (props) => {
  const {
    placeList,
    onActiveHandler,
    addToFavorites
  } = props;

  return (
    <div className="cities__places-list places__list">
      {
        placeList.map((place) => {
          return (
            <CitiesPlaceCard
              key={place.id}
              onHoverHandler={onActiveHandler}
              place={place}
              addToFavorites={addToFavorites}
            />
          );
        })
      }
    </div>
  );
};

PlaceCardList.propTypes = {
  placeList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        mark: PropTypes.string,
        img: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        isInBookmark: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onActiveHandler: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

export default React.memo(PlaceCardList);
