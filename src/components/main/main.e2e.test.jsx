import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter()
});

const placesAmount = 312;
const placeList = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

describe(`Main component e2e tests`, () => {
  it(`Main header logo click calls once`, () => {
    const onHeaderLogoClickCallback = jest.fn();

    const mainComponent = shallow(
        <Main
          placesAmount={placesAmount}
          placeList={placeList}
          onLogoLinkClickHandler={onHeaderLogoClickCallback}
        />
    );
    mainComponent.find(`.header__logo-link`).simulate(`click`);

    expect(onHeaderLogoClickCallback.mock.calls.length).toBe(1);
  });
});
