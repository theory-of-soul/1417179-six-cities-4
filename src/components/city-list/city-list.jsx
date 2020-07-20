import React from "react";
import PropTypes from 'prop-types';
import CityListItem from "../city-list-item/city-list-item";

const CityList = (props) => {
  const {
    cityList,
    activeCity,
    onCityClickHandler
  } = props;

  return (
    <ul className="locations__list tabs__list">
      {
        cityList.map((city, i) => (
          <CityListItem
            key={i}
            onCityClickHandler={onCityClickHandler}
            activeCity={activeCity}
            isActive={city === activeCity}
            city={city}
          />
        ))
      }
    </ul>
  );
};

CityList.propTypes = {
  cityList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClickHandler: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
};

export default React.memo(CityList);
