import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlacesSorting from "./places-sorting";

Enzyme.configure({
  adapter: new Adapter()
});

const Sorting = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

const typeOfSorting = Object.keys(Sorting);

describe(`PlacesSorting component e2e tests`, () => {
  it(`PlacesSorting choose sorting click calls once and with choose type`, () => {
    const onChooseSortingClickCallback = jest.fn();

    const mainComponent = shallow(
        <PlacesSorting
          chosenSorting={typeOfSorting[1]}
          isOpened={true}
          onOpenHandler={() => {}}
          onChooseSortingHandler={onChooseSortingClickCallback}
        />
    );
    mainComponent.find(`.places__option`).at(2).simulate(`click`);

    expect(onChooseSortingClickCallback.mock.calls.length).toBe(1);
    expect(onChooseSortingClickCallback.mock.calls[0][0]).toBe(typeOfSorting[2]);
  });
});
