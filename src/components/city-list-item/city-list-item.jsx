import React from "react";
import PropTypes from 'prop-types';

const CityListItem = (props) => {
  const {
    city,
    isActive,
    onCityClickHandler,
  } = props;

  let styles = `locations__item-link tabs__item`;
  if (isActive) {
    styles += ` tabs__item--active`;
  }

  return (
    <li className="locations__item">
      <a
        className={styles}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onCityClickHandler(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};


CityListItem.propTypes = {
  city: PropTypes.string.isRequired,
  onCityClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default CityListItem;
