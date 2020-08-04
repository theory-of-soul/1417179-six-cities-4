import {nameSpaces} from "../nameSpaces";

export const getCurrentCity = (state) => {
  return state[nameSpaces.APP].city;
};

export const getCurrentSorting = (state) => {
  return state[nameSpaces.APP].sorting;
};
