import React from "react";
import PropTypes from 'prop-types';
import ReviewList from "../review-list/review-list";

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
    reviewList
  } = props;
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

            <form className="reviews__form form" action="#" method="post">
              <label className="reviews__label form__label" htmlFor="review">Your review</label>
              <div className="reviews__rating-form form__rating">
                <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
                  type="radio"/>
                <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
                  type="radio"/>
                <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
                  type="radio"/>
                <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
                  type="radio"/>
                <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </div>
              <textarea className="reviews__textarea form__textarea" id="review" name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"/>
              <div className="reviews__button-wrapper">
                <p className="reviews__help">
                  To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                  your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <section className="property__map map"/>
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
  reviewList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        userName: PropTypes.string.isRequired,
        userIcon: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export default React.memo(PlaceProperty);
