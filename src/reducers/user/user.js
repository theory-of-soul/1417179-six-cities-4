import {extend} from "../../helpers/extend-object";
import {userResponseAdapter} from "../../helpers/user-response-adapter";
import history from "../../history";
import {AppUrls} from "../../app-urls";

export const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const actions = {
  UPDATE_STATUS: `UPDATE_STATUS`,
  SET_USER_PROFILE: `SET_USER_PROFILE`,
};

export const actionCreator = {
  updateUserAuthStatus: (status) => ({
    type: actions.UPDATE_STATUS,
    payload: status
  }),
  setUserProfile: (user) => ({
    type: actions.SET_USER_PROFILE,
    payload: user
  })
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  profile: {}
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
      .then((response) => {
        dispatch(actionCreator.updateUserAuthStatus(AuthorizationStatus.AUTH));
        const user = userResponseAdapter(response.data);
        dispatch(actionCreator.setUserProfile(user));
        history.push(AppUrls.BASE);
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
    case actions.SET_USER_PROFILE: {
      return extend(
          state, {
            profile: action.payload
          }
      );
    }
    default:
      return state;
  }
};
