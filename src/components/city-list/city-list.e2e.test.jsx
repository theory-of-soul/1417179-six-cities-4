import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CityList from "./city-list";

Enzyme.configure({
  adapter: new Adapter()
});

const cityList = [`Amsterdam`, `Paris`, `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`];
const activeCity = `Amsterdam`;

describe(`CityList component e2e tests`, () => {
  it(`CityList click on element calls once`, () => {
    const onCityClickHandler = jest.fn();

    const cityListComponent = shallow(
        <CityList
          cityList={cityList}
          activeCity={activeCity}
          onCityClickHandler={onCityClickHandler}
        />
    );
    cityListComponent.find(`.locations__item a`).at(1).simulate(`click`, {
      preventDefault: () => {}
    });

    expect(onCityClickHandler.mock.calls.length).toBe(1);
  });

  it(`CityList callback click argument is city`, () => {
    const onCityClickHandler = jest.fn();

    const cityListComponent = shallow(
        <CityList
          cityList={cityList}
          activeCity={activeCity}
          onCityClickHandler={onCityClickHandler}
        />
    );

    cityListComponent.find(`.locations__item a`).at(1).simulate(`click`, {
      preventDefault: () => {}
    });

    expect(onCityClickHandler.mock.calls[0][0]).toBe(`Paris`);
  });
});
