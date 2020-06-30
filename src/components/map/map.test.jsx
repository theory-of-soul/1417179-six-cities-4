import React from "react";
import renderer from 'react-test-renderer';
import Map from "./map";

const city = [52.38333, 4.9];
const markersCoordinates = [[52.3909553943508, 4.85309666406198], [52.369553943508, 4.85309666406198]];
const options = {
  createNodeMock: (element) => {
    if (element.props.id === `map`) {
      return document.createElement(`div`);
    }
    return null;
  }
};

describe(`Map component snapshot tests`, () => {
  it(`Map component render map container`, () => {
    const tree = renderer
      .create(<Map city={city} markersCoordinates={markersCoordinates}/>, options).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
