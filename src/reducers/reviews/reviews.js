import {extend} from "../../helpers/extend-object";
import {getReviewRating, getReviewText} from "./selectors";

const initialState = {
  disabledForm: false,
  addReviewError: null,
  commentRating: null,
  commentText: ``,
};

export const actions = {
  CHANGE_FORM_DISABLE: `CHANGE_FORM_DISABLE:`,
  SET_ADD_REVIEW_ERROR: `SET_ADD_REVIEW_ERROR`,
  SET_RATING: `SET_RATING`,
  SET_TEXT: `SET_TEXT`,
  CLEAR_COMMENT: `CLEAR_COMMENT`
};

export const reviewActionCreator = {
  changeFormDisabled: (isDisabled) => ({
    type: actions.CHANGE_FORM_DISABLE,
    payload: isDisabled
  }),
  setAddReviewError: (errorMessage) => ({
    type: actions.SET_ADD_REVIEW_ERROR,
    payload: errorMessage
  }),
  setCommentRating: (rating) => ({
    type: actions.SET_RATING,
    payload: rating
  }),
  setCommentText: (text) => ({
    type: actions.SET_TEXT,
    payload: text
  }),
  clearComment: () => ({
    type: actions.CLEAR_COMMENT
  }),
};

export const reviewOperations = {
  sendReview: (offerId) => (dispatch, getState, api) => {
    const state = getState();
    const review = {
      comment: getReviewText(state),
      rating: getReviewRating(state)
    };

    dispatch(reviewActionCreator.changeFormDisabled(true));
    return api
      .post(`/comments/${offerId}`, review)
      .then(() => {
        dispatch(reviewActionCreator.changeFormDisabled(false));
        dispatch(reviewActionCreator.clearComment());
        dispatch(reviewActionCreator.setAddReviewError(null));
      })
      .catch((error) => {
        if (error.response.data) {
          dispatch(reviewActionCreator.setAddReviewError(error.response.data.error));
        }
      });
  },
};


export const reviews = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_FORM_DISABLE: {
      return extend(state, {
        disabledForm: action.payload
      });
    }
    case actions.SET_ADD_REVIEW_ERROR: {
      return extend(state, {
        addReviewError: action.payload
      });
    }
    case actions.SET_RATING: {
      return extend(state, {
        commentRating: action.payload
      });
    }
    case actions.SET_TEXT: {
      return extend(state, {
        commentText: action.payload
      });
    }
    case actions.CLEAR_COMMENT: {
      return extend(state, {
        commentRating: null,
        commentText: ``
      });
    }
  }
  return state;
};
