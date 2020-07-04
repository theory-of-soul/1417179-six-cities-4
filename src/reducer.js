export const cities = {
  AMSTERDAM: `Amsterdam`,
  COLOGNE: `Cologne`,
  PARIS: `Paris`,
  BRUSSELS: `Brussels`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

export const citiesCenter = {
  [cities.AMSTERDAM]: [52.38333, 4.9],
  [cities.COLOGNE]: [50.93333, 6.95],
  [cities.PARIS]: [48.85341, 2.3488],
};

const initialState = {
  city: cities.AMSTERDAM,
  offers: [],
  cityOffers: []
};

export const actions = {
  CHOOSE_CITY: `CHOOSE_CITY`,
  INIT_OFFERS: `INIT_OFFERS`,
};

export const actionCreator = {
  setCity: (city) => ({
    type: actions.CHOOSE_CITY,
    payload: city
  }),
  setOffers: (offers) => ({
    type: actions.INIT_OFFERS,
    payload: offers
  })
};

const extend = (state, expand) => {
  return Object.assign({}, state, expand);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_OFFERS: {
      const firstOffer = action.payload[0];
      const city = firstOffer ? firstOffer.city : null;
      return extend(state, {
        offers: action.payload,
        cityOffers: action.payload.filter((place) => place.city === city),
        city
      });
    }
    case actions.CHOOSE_CITY: {
      return extend(state, {
        city: action.payload,
        cityOffers: state.offers.filter((place) => place.city === action.payload)
      });
    }
  }

  return state;
};
