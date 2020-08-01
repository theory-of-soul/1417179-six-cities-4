import {hotelResponseAdapter} from "../../helpers/hotels-response-adapter";
import {extend} from "../../helpers/extend-object";
import {appActionCreator} from "../app/app";

const initialState = {
  offers: [],
  favorites: [],
  hasError: false
};

export const actions = {
  INIT_OFFERS: `INIT_OFFERS`,
  INIT_FAVORITES: `INIT_FAVORITES`,
  SHOW_ERROR: `SHOW_ERROR`,
};

const actionCreator = {
  initOffers: (offers) => ({
    type: actions.INIT_OFFERS,
    payload: offers
  }),
  initFavorites: (favorites) => ({
    type: actions.INIT_FAVORITES,
    payload: favorites
  }),
  showError: () => ({
    type: actions.SHOW_ERROR,
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
      .catch(() => {
        dispatch(actionCreator.showError());
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api
      .get(`favorite`)
      .then((response) => {
        const favorites = hotelResponseAdapter(response.data);
        dispatch(actionCreator.initFavorites(favorites));
      })
      .catch(() => {
        dispatch(actionCreator.showError());
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
    case actions.SHOW_ERROR: {
      return extend(state, {
        hasError: true
      });
    }
    case actions.INIT_FAVORITES: {
      return extend(state, {
        favorites: action.payload
      });
    }
  }

  return state;
};
