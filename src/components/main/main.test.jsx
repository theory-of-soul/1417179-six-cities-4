import React from "react";
import renderer from 'react-test-renderer';
import Main from "./main";

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
  type: `Apartment`,
  point: [52.3909553943508, 4.929309666406198]
}, {
  id: 1,
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `week`,
  isInBookmark: false,
  rating: 0,
  name: `Beautiful & luxurious`,
  type: `Hotel`,
  point: [52.3909553943508, 4.929309666406198]
}];

describe(`Main component snapshot tests`, () => {
  it(`Main component show two places`, () => {
    const tree = renderer
      .create(
          <Main
            placeList={placeList}
            placesAmount={placesAmount}
            onLogoLinkClickHandler={() => {}}
            renderMap={() => <React.Fragment/>}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
