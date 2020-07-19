import {app as reducer} from "./app";

const initialState = {
  city: ``
};

const actions = {
  CHOOSE_CITY: `CHOOSE_CITY`
};

describe(`app reducer tests`, () => {
  it(`if reducer has no state, it returns initialState`, () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it(`change city`, () => {
    expect(reducer({
      city: `Amsterdam`
    }, {
      type: actions.CHOOSE_CITY,
      payload: `Dusseldorf`,
    })).toMatchObject({
      city: `Dusseldorf`
    });
  });
});
