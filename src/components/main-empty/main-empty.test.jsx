import React from "react";
import renderer from 'react-test-renderer';
import MainEmpty from "./main-empty";

describe(`MainEmpty component snapshot tests`, () => {
  it(`MainEmpty with text "No places to stay available"`, () => {
    const tree = renderer
      .create(<MainEmpty/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
