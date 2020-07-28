import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {ReviewSize} from "../../reducers/reviews/selectors";

const stars = new Array(5).fill(null).map((empty, index) => index + 1).reverse();

const ReviewsForm = (props) => {
  const {
    isActiveSubmit,
    onChangeRatingHandler,
    onChangeTextReviewHandler,
    onSubmitHandler,
    isFormDisabled,
    reviewRating,
    reviewText,
    addReviewError
  } = props;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitHandler();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          stars.map((star) => (
            <Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={star}
                id={`${star}-stars`}
                type="radio"
                onChange={(e) => onChangeRatingHandler(parseInt(e.target.value, 10))}
                disabled={isFormDisabled}
                checked={reviewRating === star}
              />
              <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => onChangeTextReviewHandler(e.target.value)}
        disabled={isFormDisabled}
        value={reviewText}
      />
      <div className="reviews__button-wrapper">
        {
          addReviewError ? (
            <p className="reviews__help">{addReviewError}</p>
          ) : (
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe
              your stay with at least <b className="reviews__text-amount">{ReviewSize.MIN} characters</b>.
            </p>
          )
        }
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isActiveSubmit || isFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  reviewRating: PropTypes.number,
  reviewText: PropTypes.string.isRequired,
  isActiveSubmit: PropTypes.bool.isRequired,
  onChangeRatingHandler: PropTypes.func.isRequired,
  onChangeTextReviewHandler: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  addReviewError: PropTypes.string
};

export default React.memo(ReviewsForm);
