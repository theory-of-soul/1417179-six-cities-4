import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainWrapper from "./main-wrapper";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main component e2e tests`, () => {
  it(`Main header logo click calls once`, () => {
    const onHeaderLogoClickCallback = jest.fn();

    const mainComponent = shallow(
        <MainWrapper
          isUserAuth={true}
          onLoginClickHandler={() => {}}
          onLogoLinkClickHandler={onHeaderLogoClickCallback}
        />
    );
    mainComponent.find(`.header__logo-link`).simulate(`click`);

    expect(onHeaderLogoClickCallback.mock.calls.length).toBe(1);
  });
});
