import React from "react";
import renderer from 'react-test-renderer';
import Main from "./main";

const placesAmount = 312;
const placeList = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

describe(`Main component snapshot tests`, () => {
  it(`Main component show two places`, () => {
    const tree = renderer
      .create(<Main placeList={placeList} placesAmount={placesAmount} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
