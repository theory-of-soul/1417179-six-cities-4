import React from "react";
import renderer from 'react-test-renderer';
import PlaceProperty from "./place-property";

const offers = [{
  id: 1,
  img: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  value: 235,
  time: `night`,
  isInBookmark: true,
  rating: 4,
  name: `The house among olive `,
  type: `room`,
  city: `Dusseldorf`,
  point: [51.237402, 6.797314],
  cityLocation: [51.225402, 6.776314],
  bedrooms: 1,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century`,
  goods: [`Laptop friendly workspace`],
  guests: 2,
  host: {
    hostId: 25,
    name: `Angelina`,
    isSuper: true,
    icon: `/img/avatar-angelina.jpg`
  },
  images: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`],
  isPremium: true,
}];


describe(`PlaceProperty component snapshot tests`, () => {
  it(`PlaceProperty component premium user`, () => {
    const tree = renderer
      .create(
          <PlaceProperty
            offer={offers[0]}
            isUserAuth={true}
            reviewText={``}
            isActiveReviewSubmit={true}
            isReviewFormDisabled={false}
            onReviewFormSubmitHandler={() => {}}
            onChangeRatingHandler={() => {}}
            onChangeTextReviewHandler={() => {}}
            addToFavoritesHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
