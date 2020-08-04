import {nameSpaces} from "../nameSpaces";
import {createSelector} from "reselect";

export const ReviewSize = {
  MAX: 300,
  MIN: 50
};

export const getDisabledReviewFlag = (state) => {
  return state[nameSpaces.REVIEWS].disabledForm;
};

export const getReviewRating = (state) => {
  return state[nameSpaces.REVIEWS].commentRating;
};

export const getReviewText = (state) => {
  return state[nameSpaces.REVIEWS].commentText;
};

export const getAddReviewError = (state) => {
  return state[nameSpaces.REVIEWS].addReviewError;
};

export const checkActiveReviewSubmit = createSelector(
    getReviewRating,
    getReviewText,
    (rating, text) => rating !== null && text.length >= ReviewSize.MIN && text.length <= ReviewSize.MAX
);
