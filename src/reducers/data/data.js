import {hotelResponseAdapter} from "../../helpers/hotels-response-adapter";
import {extend} from "../../helpers/extend-object";
import {appActionCreator} from "../app/app";

const initialState = {
  offers: []
};

export const actions = {
  INIT_OFFERS: `INIT_OFFERS`,
};

const actionCreator = {
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
        dispatch(appActionCreator.setCity(offers[0].city));
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_OFFERS: {
      return extend(state, {
        offers: action.payload
      });
    }
  }

  return state;
};
