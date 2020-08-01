import React from "react";
import renderer from 'react-test-renderer';
import Favorites from "./favorites";

describe(`Favorites component snapshot tests`, () => {
  it(`Favorites component without places`, () => {
    const tree = renderer
      .create(
          <Favorites favorites={{

          }} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Favorites component with places`, () => {
    const tree = renderer
      .create(
          <Favorites favorites={{

          }} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
