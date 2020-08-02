import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter()
});

const placesAmount = 312;
const placeList = [{
  id: 0,
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`,
  point: [52.369553943508, 4.85309666406198],
  cityLocation: [52.38333, 4.9]
}, {
  id: 1,
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `week`,
  isInBookmark: false,
  rating: 0,
  name: `Beautiful & luxurious`,
  type: `Hotel`,
  point: [52.3909553943508, 4.929309666406198],
  cityLocation: [52.38333, 4.9]
}];
const cityList = [`Amsterdam`, `Paris`, `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`];
const activeCity = `Amsterdam`;

describe(`Main component e2e tests`, () => {
  it(`Main header logo click calls once`, () => {
    const onHeaderLogoClickCallback = jest.fn();

    const mainComponent = shallow(
        <Main
          placesAmount={placesAmount}
          placeList={placeList}
          cityList={cityList}
          activeCity={activeCity}
          onLogoLinkClickHandler={onHeaderLogoClickCallback}
          onCityClickHandler={() => {}}
          renderMap={() => <React.Fragment/>}
        />
    );
    mainComponent.find(`.header__logo-link`).simulate(`click`);

    expect(onHeaderLogoClickCallback.mock.calls.length).toBe(1);
  });
});
