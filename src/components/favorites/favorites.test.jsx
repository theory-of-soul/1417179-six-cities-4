import React from "react";
import renderer from 'react-test-renderer';
import Favorites from "./favorites";
import {BrowserRouter} from "react-router-dom";

const offers = [{
  id: 1,
  img: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  value: 235,
  time: `night`,
  isInBookmark: true,
  rating: 2.4,
  name: `The house among olive `,
  type: `apartment`,
  city: `Dusseldorf`,
  point: [51.237402, 6.797314],
  cityLocation: [51.225402, 6.776314],
  bedrooms: 4,
  description: `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
  goods: [`Laptop friendly workspace`],
  guests: 6,
  host: {
    hostId: 25,
    name: `Angelina`,
    isSuper: true,
    icon: `img/avatar-angelina.jpg`
  },
  images: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`],
  isPremium: false,
}];

describe(`Favorites component snapshot tests`, () => {
  it(`Favorites component without places`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Favorites
              favorites={{
                hasFavorites: false,
                offers: []
              }}
              onLoadFavorites={() => {}}
              addToFavoritesHandler={() => {}}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Favorites component with places`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Favorites
              favorites={{
                hasFavorites: true,
                offers: [{
                  city: `Dusseldorf`,
                  places: offers
                }]
              }}
              onLoadFavorites={() => {}}
              addToFavoritesHandler={() => {}}
            />
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
