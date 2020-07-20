import React from "react";
import renderer from 'react-test-renderer';
import CityListItem from "./city-list-item";

const city = `Amsterdam`;

describe(`CityListItem component snapshot tests`, () => {
  it(`CityListItem component is active`, () => {
    const tree = renderer
      .create(<CityListItem isActive={true} city={city} onCityClickHandler={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`CityListItem component is inactive`, () => {
    const tree = renderer
      .create(<CityListItem isActive={false} city={city} onCityClickHandler={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
