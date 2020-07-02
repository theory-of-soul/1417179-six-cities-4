export const cities = {
  AMSTERDAM: `Amsterdam`,
  COLOGNE: `Cologne`,
  PARIS: `Paris`,
  BRUSSELS: `Brussels`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

const initialState = {
  city: null,
  offers: [],
  cityOffers: []
};

export const actions = {
  SET_CITY: `SET_CITY`,
  SET_OFFERS: `SET_OFFERS`,
};

export const actionCreator = {
  setCity: (city) => ({
    type: actions.SET_CITY,
    payload: city
  }),
  setOffers: (offers) => ({
    type: actions.SET_OFFERS,
    payload: offers
  })
};

const extend = (state, expand) => {
  return Object.assign({}, state, expand);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_OFFERS: {
      const firstOffer = action.payload[0];
      const city = firstOffer ? firstOffer.city : null;
      return extend(state, {
        offers: action.payload,
        cityOffers: action.payload.filter((place) => place.city === city),
        city
      });
    }
    case actions.SET_CITY: {
      return extend(state, {
        city: action.payload,
        cityOffers: state.offers.filter((place) => place.city === action.payload)
      });
    }
  }

  return state;
};
