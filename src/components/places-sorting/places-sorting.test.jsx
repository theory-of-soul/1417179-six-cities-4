import React from "react";
import renderer from 'react-test-renderer';
import PlacesSorting from "./places-sorting";

describe(`PlacesSorting component snapshot tests`, () => {
  it(`PlacesSorting component show four type of sorting with open menu`, () => {
    const tree = renderer
      .create(
          <PlacesSorting
            chosenSorting={`Price: low to high`}
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
            chosenSorting={`Popular`}
            isOpened={false}
            onOpenHandler={() => {}}
            onChooseSortingHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
