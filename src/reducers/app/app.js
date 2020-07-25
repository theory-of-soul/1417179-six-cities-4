import {extend} from "../../helpers/extend-object";
import {Sorting} from "../../components/places-sorting/places-sorting";

const initialState = {
  city: ``,
  sorting: Sorting.POPULAR
};

export const actions = {
  CHOOSE_CITY: `CHOOSE_CITY`,
  CHOOSE_SORTING: `CHOOSE_SORTING`
};

export const appActionCreator = {
  setCity: (city) => ({
    type: actions.CHOOSE_CITY,
    payload: city
  }),
  chooseSorting: (sortingName) => ({
    type: actions.CHOOSE_SORTING,
    payload: sortingName
  }),
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_CITY: {
      return extend(state, {
        city: action.payload
      });
    }
    case actions.CHOOSE_SORTING: {
      return extend(state, {
        sorting: action.payload
      });
    }
  }
  return state;
};
