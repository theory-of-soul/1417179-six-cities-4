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
  UPDATE_STATUS: `UPDATE_STATUS`
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
      .reply(200, [{fake: true}]);

    questionLoader(dispatch, () => {}, createdApi)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.UPDATE_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });
});
