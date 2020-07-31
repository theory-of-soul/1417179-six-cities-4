import React from "react";
import renderer from 'react-test-renderer';
import LogIn from "./log-in";
import {BrowserRouter} from "react-router-dom";

describe(`LogIn component snapshot tests`, () => {
  it(`LogIn component`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <LogIn onSubmitHandler={() => {}}/>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
