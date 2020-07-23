import {extend} from "../../helpers/extend-object";

export const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const actions = {
  UPDATE_STATUS: `UPDATE_STATUS`
};

export const actionCreator = {
  updateUserAuthStatus: (status) => ({
    type: actions.UPDATE_STATUS,
    payload: status
  })
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

export const userOperations = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => response)
      .catch((error) => error);
  },
  login: (email, password) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email,
        password
      })
      .then(() => {
        dispatch(actionCreator.updateUserAuthStatus(AuthorizationStatus.AUTH));
      })
      .catch((error) => error);
  },
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_STATUS: {
      return extend(
          state, {
            authorizationStatus: action.payload
          }
      );
    }
    default:
      return state;
  }
};
