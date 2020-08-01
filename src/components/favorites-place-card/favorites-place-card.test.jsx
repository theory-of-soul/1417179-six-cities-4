import React from "react";
import renderer from 'react-test-renderer';
import FavoritesPlaceCard from "./favorites-place-card";

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

describe(`FavoritesPlaceCard component snapshot tests`, () => {
  it(`FavoritesPlaceCard based PlaceCard with special classes and image sizes`, () => {
    const tree = renderer
      .create(
          <FavoritesPlaceCard
            place={place}
            onHoverHandler={() => {}}
            onClickTitle={() => {}}
            addToFavorites={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
