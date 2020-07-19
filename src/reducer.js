import {hotelResponseAdapter} from "./helpers/hotels-response-adapter";
import {extend} from "./helpers/extend-object";

const initialState = {
  city: `Amsterdam`,
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
  initOffers: (offers) => ({
    type: actions.INIT_OFFERS,
    payload: offers
  })
};

export const operationCreator = {
  loadHotelOffers: () => (dispatch, getState, api) => {
    return api
      .get(`hotels`)
      .then((response) => {
        const offers = hotelResponseAdapter(response.data);
        dispatch(actionCreator.initOffers(offers));
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
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
