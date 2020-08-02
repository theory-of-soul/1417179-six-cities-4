import {nameSpaces} from "../nameSpaces";
import {createSelector} from 'reselect';
import {getCurrentCity} from "../app/selectors";

export const getHotelsOffers = (state) => {
  return state[nameSpaces.DATA].offers;
};

export const getHasErrorFlag = (state) => {
  return state[nameSpaces.DATA].hasError;
};

export const getUniqCities = (state) => {
  const allCities = getHotelsOffers(state).map((place) => place.city);
  return [...new Set(allCities)];
};

export const getCurrentCityOffers = createSelector(
    getCurrentCity,
    getHotelsOffers,
    (city, offers) => offers.filter((place) => place.city === city)
);
