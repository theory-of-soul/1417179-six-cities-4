import {user as reducer, userOperations} from "../user/user";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const actions = {
  UPDATE_STATUS: `UPDATE_STATUS`,
  SET_USER_PROFILE: `SET_USER_PROFILE`
};

describe(`User reducer tests`, () => {
  it(`reducer without parameters return initialState`, () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it(`update status to auth`, () => {
    expect(reducer(initialState, {
      type: actions.UPDATE_STATUS,
      payload: AuthorizationStatus.AUTH
    })).toMatchObject({
      authorizationStatus: AuthorizationStatus.AUTH
    });
  });

  it(`user logged`, () => {
    const createdApi = createAPI();
    const apiMock = new MockAdapter(createdApi);
    const dispatch = jest.fn();
    const questionLoader = userOperations.login(`fake@email.com`, `fakePassword`);

    apiMock
      .onPost(`/login`)
      .reply(200, {
        // eslint-disable-next-line camelcase
        avatar_url: `avatar.jpg`,
        email: `fake@email.com`,
        id: 881,
        // eslint-disable-next-line camelcase
        is_pro: true
      });

    questionLoader(dispatch, () => {}, createdApi)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: actions.UPDATE_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: actions.SET_USER_PROFILE,
          payload: {
            avatar: `avatar.jpg`,
            email: `fake@email.com`,
            id: 881,
            isPro: true
          }
        });
      });
  });
});
