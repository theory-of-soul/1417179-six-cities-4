import React from "react";
import PropTypes from 'prop-types';

const CityList = (props) => {
  const {
    cityList,
    activeCity,
    onCityClickHandler
  } = props;

  return (
    <ul className="locations__list tabs__list">
      {
        cityList.map((city, i) => {
          let styles = `locations__item-link tabs__item`;
          if (city === activeCity) {
            styles += ` tabs__item--active`;
          }
          return (
            <li className="locations__item" key={i}>
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
        })
      }
    </ul>
  );
};

CityList.propTypes = {
  cityList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClickHandler: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
};

export default CityList;
