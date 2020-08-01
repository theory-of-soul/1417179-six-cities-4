import {nameSpaces} from "../nameSpaces";
import {createSelector} from "reselect";
import {AuthorizationStatus} from "./user";

export const getUserAuthStatus = (state) => {
  return state[nameSpaces.USER].authorizationStatus;
};

export const getUserEmail = (state) => {
  return state[nameSpaces.USER].profile.email;
};

export const isUserAuth = createSelector(
    getUserAuthStatus,
    (status) => status === AuthorizationStatus.AUTH
);
