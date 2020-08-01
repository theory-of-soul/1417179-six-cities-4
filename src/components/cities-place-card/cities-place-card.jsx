import React from "react";
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";

const CitiesPlaceCard = (props) => (
  <PlaceCard
    {...props}
    className="cities__place-card"
    imageClassName="cities__image-wrapper"
    imageSize={{
      width: 260,
      height: 200
    }}
  />
);

CitiesPlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mark: PropTypes.string,
    img: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    isInBookmark: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onHoverHandler: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

export default React.memo(CitiesPlaceCard);
