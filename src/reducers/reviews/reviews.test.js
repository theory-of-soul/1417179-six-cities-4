import {reviewOperations, reviews as reducer} from "./reviews";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

const initialState = {
  disabledForm: false,
  addReviewError: null,
  commentRating: null,
  commentText: ``,
};

const actions = {
  CHANGE_FORM_DISABLE: `CHANGE_FORM_DISABLE:`,
  SET_ADD_REVIEW_ERROR: `SET_ADD_REVIEW_ERROR`,
  SET_RATING: `SET_RATING`,
  SET_TEXT: `SET_TEXT`,
  CLEAR_COMMENT: `CLEAR_COMMENT`
};

const api = createAPI(() => {});
const axiosMock = new MockAdapter(api);

describe(`reviews reducer tests`, () => {
  it(`if reducer has no state, it returns initialState`, () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it(`set disable flag for form`, () => {
    expect(reducer({
      disabledForm: false,
    }, {
      type: actions.CHANGE_FORM_DISABLE,
      payload: true,
    })).toMatchObject({
      disabledForm: true,
    });
  });

  it(`set error message for add review api`, () => {
    expect(reducer({
      addReviewError: null
    }, {
      type: actions.SET_ADD_REVIEW_ERROR,
      payload: `message about server error`,
    })).toMatchObject({
      addReviewError: `message about server error`,
    });
  });

  it(`set comment rating from 1 to 5`, () => {
    expect(reducer({
      commentRating: 1
    }, {
      type: actions.SET_RATING,
      payload: 5,
    })).toMatchObject({
      commentRating: 5
    });
  });

  it(`set comment text`, () => {
    expect(reducer({
      commentText: ``
    }, {
      type: actions.SET_TEXT,
      payload: `any comment`,
    })).toMatchObject({
      commentText: `any comment`
    });
  });

  it(`clear comment when form was sent`, () => {
    expect(reducer({
      commentRating: 5,
      commentText: `any comment`
    }, {
      type: actions.CLEAR_COMMENT,
    })).toMatchObject({
      commentRating: null,
      commentText: ``
    });
  });

  it(`operation add review`, () => {
    const dispatch = jest.fn();
    const sendingReview = reviewOperations.sendReview();
    const state = {
      reviews: {
        commentRating: 3,
        commentText: `text`,
        disabledForm: false,
        addReviewError: null
      }
    };

    axiosMock
      .onPost(`/comments/1`, {
        comment: `comment at least 50 letters`,
        rating: 5
      })
      .reply(200);

    sendingReview(dispatch, () => state, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.CHANGE_FORM_DISABLE,
          payload: true
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: actions.CLEAR_COMMENT
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: actions.SET_ADD_REVIEW_ERROR,
          payload: null
        });
      })
      .catch(() => {});
  });

  it(`operation catch error when add review`, () => {
    const dispatch = jest.fn();
    const sendingReview = reviewOperations.sendReview();
    const state = {
      reviews: {
        commentRating: 3,
        commentText: `text`,
        disabledForm: false,
        addReviewError: null
      }
    };

    axiosMock
      .onPost(`/comments/undefined`, {
        comment: `comment at least 50 letters`,
        rating: 5
      })
      .reply(404, {error: `not found it`});

    sendingReview(dispatch, () => state, api)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.CLEAR_COMMENT,
          payload: `not found it`
        });
      });
  });
});
