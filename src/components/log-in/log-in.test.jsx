import React from "react";
import renderer from 'react-test-renderer';
import LogIn from "./log-in";

describe(`LogIn component snapshot tests`, () => {
  it(`LogIn component`, () => {
    const tree = renderer
      .create(
          <LogIn onSubmitHandler={() => {}}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
