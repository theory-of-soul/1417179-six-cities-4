import React from "react";
import renderer from 'react-test-renderer';
import App from "./app";

const placesAmount = 312;
const placeList = [{
  id: 0,
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`
}, {
  id: 1,
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `week`,
  isInBookmark: false,
  rating: 0,
  name: `Beautiful & luxurious`,
  type: `Hotel`
}];

describe(`App component snapshot tests`, () => {
  it(`App component show Main screen`, () => {
    const tree = renderer
      .create(<App placeList={placeList} placesAmount={placesAmount} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
