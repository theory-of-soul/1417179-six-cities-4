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
  point: [52.3909553943508, 4.929309666406198],
  cityLocation: [52.38333, 4.9]
}, {
  id: 1,
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `week`,
  isInBookmark: false,
  rating: 0,
  name: `Beautiful & luxurious`,
  type: `Hotel`,
  point: [52.3909553943508, 4.929309666406198],
  cityLocation: [52.38333, 4.9]
}];
const cityList = [`Amsterdam`, `Paris`, `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`];
const activeCity = `Amsterdam`;

describe(`Main component snapshot tests`, () => {
  it(`Main component show two places`, () => {
    const tree = renderer
      .create(
          <Main
            placeList={placeList}
            placesAmount={placesAmount}
            cityList={cityList}
            activeCity={activeCity}
            onLogoLinkClickHandler={() => {}}
            onCityClickHandler={() => {}}
            renderMap={() => <React.Fragment/>}
            hasError={false}
            onClickCardTitle={() => {}}
            isUserAuth={true}
            onLoginClickHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Main if places has no, have to be phrase "No places to stay available"`, () => {
    const tree = renderer
      .create(
          <Main
            placeList={[]}
            placesAmount={0}
            cityList={cityList}
            activeCity={activeCity}
            onLogoLinkClickHandler={() => {}}
            onCityClickHandler={() => {}}
            renderMap={() => <React.Fragment/>}
            hasError={false}
            onClickCardTitle={() => {}}
            isUserAuth={false}
            onLoginClickHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if has error show error message`, () => {
    const tree = renderer
      .create(
          <Main
            hasError={true}
            placeList={[]}
            placesAmount={0}
            cityList={[]}
            activeCity={``}
            onLogoLinkClickHandler={() => {}}
            onCityClickHandler={() => {}}
            renderMap={() => <React.Fragment/>}
            onClickCardTitle={() => {}}
            isUserAuth={true}
            onLoginClickHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
