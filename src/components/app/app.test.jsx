import React from "react";
import renderer from 'react-test-renderer';
import App from "./app";

const placesAmount = 312;
const placeList = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

describe(`App component snapshot tests`, () => {
  it(`App component show Main screen`, () => {
    const tree = renderer
      .create(<App placeList={placeList} placesAmount={placesAmount} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
