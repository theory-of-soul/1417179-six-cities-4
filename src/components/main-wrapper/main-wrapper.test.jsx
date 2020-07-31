import React from "react";
import renderer from 'react-test-renderer';
import MainWrapper from "./main-wrapper";
import {BrowserRouter} from "react-router-dom";

describe(`MainWrapper component snapshot tests`, () => {
  it(`MainWrapper show header auth user with additional class`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MainWrapper
              isUserAuth={true}
              className="addAnyClass"
            >
              children here
            </MainWrapper>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainWrapper show header not auth user without additional class`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MainWrapper
              isUserAuth={false}
            >
              children here
            </MainWrapper>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
