import {extend} from "../../helpers/extend-object";

const initialState = {
  city: ``
};

export const actions = {
  CHOOSE_CITY: `CHOOSE_CITY`
};

export const appActionCreator = {
  setCity: (city) => ({
    type: actions.CHOOSE_CITY,
    payload: city
  }),
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_CITY: {
      return extend(state, {
        city: action.payload
      });
    }
  }

  return state;
};
