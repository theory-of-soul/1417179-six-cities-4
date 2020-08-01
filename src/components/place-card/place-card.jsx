import React from "react";
import PropTypes from 'prop-types';
import {AppUrls} from "../../app-urls";
import {Link} from "react-router-dom";

const PlaceCard = (props) => {
  const {
    place: {
      id,
      mark = false,
      img,
      value,
      time,
      isInBookmark,
      rating,
      name,
      type
    },
    onHoverHandler,
    addToFavorites,
    className,
    imageClassName,
    imageSize
  } = props;

  let placeCardStyle = `place-card`;
  if (className) {
    placeCardStyle += ` ${className}`;
  }

  let imageStyle = `place-card__image-wrapper`;
  if (imageClassName) {
    imageStyle += ` ${imageClassName}`;
  }

  return (
    <article
      className={placeCardStyle}
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
      <div className={imageStyle}>
        <a href="#">
          <img className="place-card__image" src={img} alt={name} {...imageSize}/>
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
            onClick={() => {
              addToFavorites(id, isInBookmark);
            }}
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
          <Link to={AppUrls.OFFER + id}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
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
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
};

export default React.memo(PlaceCard);
