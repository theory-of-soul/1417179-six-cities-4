import React from "react";
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";

const FavoritesPlaceCard = (props) => (
  <PlaceCard
    {...props}
    className="favorites__card"
    imageClassName="favorites__image-wrapper"
    imageSize={{
      width: 150,
      height: 110
    }}
  />
);

FavoritesPlaceCard.propTypes = {
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

export default React.memo(FavoritesPlaceCard);
