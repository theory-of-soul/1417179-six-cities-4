import React from "react";
import renderer from 'react-test-renderer';
import MainWrapper from "./main-wrapper";

describe(`MainWrapper component snapshot tests`, () => {
  it(`MainWrapper show header auth user with additional class`, () => {
    const tree = renderer
      .create(
          <MainWrapper
            onLogoLinkClickHandler={() => {}}
            isUserAuth={true}
            onLoginClickHandler={() => {}}
            className="addAnyClass"
          >
            children here
          </MainWrapper>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainWrapper show header not auth user without additional class`, () => {
    const tree = renderer
      .create(
          <MainWrapper
            onLogoLinkClickHandler={() => {}}
            isUserAuth={false}
            onLoginClickHandler={() => {}}
          >
            children here
          </MainWrapper>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
