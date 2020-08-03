import React from "react";
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";

const PlaceCardList = (props) => {
  const {placeList, onActiveHandler, onClickCardTitle, className = ``} = props;

  return (
    <div className={`${className} places__list tabs__content`}>
      {
        placeList.map((place) => {
          return (
            <PlaceCard
              key={place.id}
              onHoverHandler={onActiveHandler}
              place={place}
              onClickTitle={onClickCardTitle}
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
  onClickCardTitle: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default React.memo(PlaceCardList);
