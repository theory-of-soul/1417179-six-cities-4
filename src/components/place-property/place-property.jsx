import React from "react";
import PropTypes from 'prop-types';
import ReviewList from "../review-list/review-list";
import ReviewsForm from "../reviews-form/reviews-form";

const PlaceProperty = (props) => {
  const {
    images,
    title,
    description,
    isPremium,
    type,
    rating,
    rooms,
    guests,
    price,
    goods,
    host: {
      icon,
      name,
      isSuper,
    },
    reviewList,
    cityCoordinates,
    coordinates,
    renderMap,
    renderPlaces,
    onClickCardTitle,
    neighbourhoods,
    isUserAuth,
    isReviewFormDisabled,
    onReviewFormSubmitHandler,
    onChangeRatingHandler,
    onChangeTextReviewHandler,
    isActiveReviewSubmit,
    reviewRating,
    reviewText,
    addReviewError
  } = props;

  const nearPlaces = neighbourhoods.slice(0, 3).map((place) => place.point);
  const coordinatesWithNearPlaces = [coordinates, ...nearPlaces];

  return (
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {
            images.map((img, i) => (
              <div className="property__image-wrapper" key={i}>
                <img className="property__image" src={img} alt={title} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          <div className="property__mark">
            {isPremium && <span>Premium</span>}
          </div>
          <div className="property__name-wrapper">
            <h1 className="property__name">{title}</h1>
            <button className="property__bookmark-button button" type="button">
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `${rating * 20}%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {rooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {guests} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods.map((good, i) => (<li className="property__inside-item" key={i}>{good}</li>))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className={
                `property__avatar-wrapper user__avatar-wrapper ${isSuper ? `property__avatar-wrapper--pro` : ``}`
              }>
                <img className="property__avatar user__avatar" src={icon} width="74" height="74"
                  alt="Host avatar"/>
              </div>
              <span className="property__user-name">{name}</span>
            </div>
            <div className="property__description">
              {description}
            </div>
          </div>
          <section className="property__reviews reviews">
            <ReviewList reviewList={reviewList}/>
            {
              isUserAuth && (
                <ReviewsForm
                  reviewRating={reviewRating}
                  reviewText={reviewText}
                  isActiveSubmit={isActiveReviewSubmit}
                  onChangeRatingHandler={onChangeRatingHandler}
                  onChangeTextReviewHandler={onChangeTextReviewHandler}
                  onSubmitHandler={onReviewFormSubmitHandler}
                  isFormDisabled={isReviewFormDisabled}
                  addReviewError={addReviewError}
                />
              )
            }
          </section>
        </div>
      </div>

      {renderMap(coordinatesWithNearPlaces, cityCoordinates)}

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {renderPlaces(neighbourhoods, onClickCardTitle)}
          </div>
        </section>
      </div>
    </section>
  );
};

const typeAccommodation = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

PlaceProperty.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    typeAccommodation.APARTMENT,
    typeAccommodation.ROOM,
    typeAccommodation.HOTEL,
    typeAccommodation.HOUSE,
  ]).isRequired,
  rating: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  host: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired,
  }),
  coordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
  cityCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  reviewList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        userName: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  renderMap: PropTypes.func.isRequired,
  renderPlaces: PropTypes.func.isRequired,
  onClickCardTitle: PropTypes.func.isRequired,
  neighbourhoods: PropTypes.arrayOf(
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
        point: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
        cityLocation: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  onReviewFormSubmitHandler: PropTypes.func.isRequired,
  onChangeRatingHandler: PropTypes.func.isRequired,
  isReviewFormDisabled: PropTypes.bool.isRequired,
  isActiveReviewSubmit: PropTypes.bool.isRequired,
  onChangeTextReviewHandler: PropTypes.func.isRequired,
  reviewRating: PropTypes.number,
  reviewText: PropTypes.string.isRequired,
  addReviewError: PropTypes.string,
};

export default React.memo(PlaceProperty);
