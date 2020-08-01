import React from "react";
import renderer from 'react-test-renderer';
import MainLoginWrapper from "./main-login-wrapper";
import {BrowserRouter} from "react-router-dom";

const children = <div/>;

describe(`MainLoginWrapper component snapshot tests`, () => {
  it(`MainLoginWrapper use special classes`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MainLoginWrapper
              isUserAuth={true}
              userEmail="fake@email.com"
              className="page__main--login"
            >
              {children}
            </MainLoginWrapper>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
