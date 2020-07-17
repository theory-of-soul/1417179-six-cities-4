import React from "react";
import PropTypes from 'prop-types';

const PlaceCard = (props) => {
  const {
    place: {
      mark = false,
      img,
      value,
      time,
      isInBookmark,
      rating,
      name,
      type
    },
    onHoverHandler
  } = props;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => {
        onHoverHandler(props.place);
      }}
    >
      {
        mark && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={img} width="260" height="200" alt={name}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{value}</b>
            <span className="place-card__price-text">&#47;&nbsp;{time}</span>
          </div>
          <button
            className={
              `place-card__bookmark-button button ${isInBookmark ? `place-card__bookmark-button--active` : ``}`
            }
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    mark: PropTypes.string,
    img: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    isInBookmark: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onHoverHandler: PropTypes.func.isRequired
};

export default React.memo(PlaceCard);
