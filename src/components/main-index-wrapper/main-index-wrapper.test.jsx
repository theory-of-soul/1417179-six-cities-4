import React from "react";
import renderer from 'react-test-renderer';
import MainIndexWrapper from "./main-index-wrapper";
import {BrowserRouter} from "react-router-dom";

const children = <div/>;

describe(`MainIndexWrapper component snapshot tests`, () => {
  it(`MainIndexWrapper `, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MainIndexWrapper
              isUserAuth={true}
              userEmail="fake@email.com"
              className="page__main--index-empty"
            >
              {children}
            </MainIndexWrapper>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
