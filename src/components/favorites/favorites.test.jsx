import React from "react";
import renderer from 'react-test-renderer';
import Favorites from "./favorites";

describe(`Favorites component snapshot tests`, () => {
  it(`Favorites component`, () => {
    const tree = renderer
      .create(
          <Favorites />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
