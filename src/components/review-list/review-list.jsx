import React from "react";
import PropTypes from 'prop-types';
import Review from "../review/review";

const ReviewList = ({reviewList}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
      <ul className="reviews__list">
        {reviewList.map((review) => (<Review key={review.id} {...review}/>))}
      </ul>
    </>
  );
};

ReviewList.propTypes = {
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

export default React.memo(ReviewList);
