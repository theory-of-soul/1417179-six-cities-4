import React from "react";
import PropTypes from 'prop-types';
import dayjs from "dayjs";

const Review = (props) => {
  const {
    rating,
    date,
    text,
    userIcon,
    userName
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userIcon} width="54" height="54"
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={dayjs(date).format(`YYYY-MM-DD`)}>
          {dayjs(date).format(`MMMM DD, YYYY`)}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  userName: PropTypes.string.isRequired,
  userIcon: PropTypes.string.isRequired
};

export default React.memo(Review);
