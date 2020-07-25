import {app as reducer} from "./app";

const initialState = {
  city: ``,
  sorting: `Popular`
};

const actions = {
  CHOOSE_CITY: `CHOOSE_CITY`,
  CHOOSE_SORTING: `CHOOSE_SORTING`
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

  it(`change sorting`, () => {
    expect(reducer({
      sorting: `Popular`
    }, {
      type: actions.CHOOSE_SORTING,
      payload: `Price: low to high`,
    })).toMatchObject({
      sorting: `Price: low to high`
    });
  });
});
