import React from "react";
import renderer from 'react-test-renderer';
import {App} from "./app";

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
const cityList = [`Amsterdam`, `Paris`, `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`];
const activeCity = `Amsterdam`;

const options = {
  createNodeMock: (element) => {
    if (element.props.id === `map`) {
      return document.createElement(`div`);
    }
    return null;
  }
};

describe(`App component snapshot tests`, () => {
  it(`App component show Main screen`, () => {
    const tree = renderer
      .create(
          <App
            placeList={placeList}
            placesAmount={placesAmount}
            setLoadedOffers={() => {}}
            chooseCity={() => {}}
            activeCity={activeCity}
            cityList={cityList}
          />,
          options
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
