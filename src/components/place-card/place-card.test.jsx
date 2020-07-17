import React from "react";
import renderer from 'react-test-renderer';
import PlaceCard from "./place-card";

const placeList = [{
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`
}, {
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `week`,
  isInBookmark: false,
  rating: 0,
  name: `Beautiful & luxurious`,
  type: `Hotel`
}];

describe(`PlaceCard component snapshot tests`, () => {
  it(`PlaceCard component show place with a mark and in bookmark`, () => {
    const tree = renderer
      .create(<PlaceCard place={placeList[0]} onHoverHandler={() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PlaceCard component show place without mark and not in bookmark`, () => {
    const tree = renderer
      .create(<PlaceCard place={placeList[1]} onHoverHandler={() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
