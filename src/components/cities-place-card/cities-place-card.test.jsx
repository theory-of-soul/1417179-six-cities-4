import React from "react";
import renderer from 'react-test-renderer';
import CitiesPlaceCard from "./cities-place-card";
import {BrowserRouter} from "react-router-dom";

const place = {
  id: 0,
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`
};

describe(`CitiesPlaceCard component snapshot tests`, () => {
  it(`CitiesPlaceCard based PlaceCard with special classes and image sizes`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <CitiesPlaceCard
              place={place}
              onHoverHandler={() => {}}
              addToFavorites={() => {}}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
