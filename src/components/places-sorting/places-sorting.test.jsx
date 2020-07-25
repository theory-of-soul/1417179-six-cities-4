import React from "react";
import renderer from 'react-test-renderer';
import PlacesSorting from "./places-sorting";

describe(`PlacesSorting component snapshot tests`, () => {
  it(`PlacesSorting component show four type of sorting with open menu`, () => {
    const tree = renderer
      .create(
          <PlacesSorting
            chosenSorting={`PRICE_LOW_TO_HIGH`}
            isOpened={true}
            onOpenHandler={() => {}}
            onChooseSortingHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PlacesSorting component show default type of sorting with close menu`, () => {
    const tree = renderer
      .create(
          <PlacesSorting
            chosenSorting={`POPULAR`}
            isOpened={false}
            onOpenHandler={() => {}}
            onChooseSortingHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
