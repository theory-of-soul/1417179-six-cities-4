import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CityListItem from "./city-list-item";

Enzyme.configure({
  adapter: new Adapter()
});

const city = `Amsterdam`;

describe(`CityListItem component e2e tests`, () => {
  it(`CityListItem click on element calls once`, () => {
    const onCityClickHandler = jest.fn();

    const cityListItemComponent = shallow(
        <CityListItem
          city={city}
          isActive={false}
          onCityClickHandler={onCityClickHandler}
        />
    );
    cityListItemComponent.find(`.locations__item-link`).simulate(`click`, {
      preventDefault: () => {}
    });

    expect(onCityClickHandler.mock.calls.length).toBe(1);
  });

  it(`CityListItem callback click argument is city`, () => {
    const onCityClickHandler = jest.fn();

    const cityListItemComponent = shallow(
        <CityListItem
          city={city}
          isActive={false}
          onCityClickHandler={onCityClickHandler}
        />
    );

    cityListItemComponent.find(`.locations__item-link`).simulate(`click`, {
      preventDefault: () => {}
    });

    expect(onCityClickHandler.mock.calls[0][0]).toBe(city);
  });
});
