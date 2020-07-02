import placeList from "src/mocks/offers";

const cities = {
  AMSTERDAM: `Amsterdam`
};

const initialState = {
  city: cities.AMSTERDAM,
  placeList,
  cityOffers: placeList.filter((place) => place.city === cities.AMSTERDAM)
};

const actions = {
  SET_CITY: `SET_CITY`,
  SET_CITY_OFFERS: `SET_CITY_OFFERS`
};

export const actionCreator = {
  setCity: (city) => ({
    type: actions.SET_CITY,
    payload: city
  }),
  setOffers: (city) => ({
    type: actions.SET_CITY_OFFERS,
    payload: city
  })
};

const extend = (state, expand) => {
  return Object.assign({}, state, expand);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CITY: {
      return extend(state, {
        city: action.payload
      });
    }
    case actions.SET_CITY_OFFERS: {
      return extend(state, {
        offers: state.placeList.filter((place) => place.city === action.payload)
      });
    }
  }

  return state;
};
