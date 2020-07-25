import {nameSpaces} from "../nameSpaces";
import {createSelector} from 'reselect';
import {getCurrentCity, getCurrentSorting} from "../app/selectors";
import {Sorting} from "../../components/places-sorting/places-sorting";

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
    getCurrentSorting,
    (city, offers, sorting) => {
      const cityOffers = offers.filter((place) => place.city === city);
      switch (sorting) {
        case Sorting.POPULAR: {
          return cityOffers;
        }
        case Sorting.PRICE_LOW_TO_HIGH: {
          return cityOffers.sort((a, b) => a.value - b.value);
        }
        case Sorting.PRICE_HIGH_TO_LOW: {
          return cityOffers.sort((a, b) => b.value - a.value);
        }
        case Sorting.TOP_RATED: {
          return cityOffers.sort((a, b) => b.rating - a.rating);
        }
      }

      return cityOffers;
    }
);
