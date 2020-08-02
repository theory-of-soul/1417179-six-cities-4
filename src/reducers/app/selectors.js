import {nameSpaces} from "../nameSpaces";

export const getCurrentCity = (state) => {
  return state[nameSpaces.APP].city;
};
