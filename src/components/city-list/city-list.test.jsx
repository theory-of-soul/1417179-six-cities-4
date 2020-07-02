import React from "react";
import renderer from 'react-test-renderer';
import CityList from "./city-list";

const cityList = [`Amsterdam`, `Paris`, `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`];
const activeCity = `Amsterdam`;

describe(`CityList component snapshot tests`, () => {
  it(`CityList component show cities`, () => {
    const tree = renderer
      .create(<CityList cityList={cityList} activeCity={activeCity} onCityClickHandler={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
