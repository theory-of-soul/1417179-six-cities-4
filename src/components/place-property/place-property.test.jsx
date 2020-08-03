import React from "react";
import renderer from 'react-test-renderer';
import PlaceProperty from "./place-property";

const reviewList = [{
  id: 0,
  rating: 2,
  text: `It was a pain. Wi-Fi was soooo low.`,
  date: new Date(`2020-06-10`),
  userName: `Alex`,
  userIcon: `img/avatar-max.jpg`
}];

const neighbourhoods = [{
  id: 1,
  img: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  value: 235,
  time: `night`,
  isInBookmark: false,
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

describe(`PlaceProperty component snapshot tests`, () => {
  it(`PlaceProperty component premium user`, () => {
    const tree = renderer
      .create(
          <PlaceProperty
            images={[`img/apartment-01.jpg`, `img/apartment-02.jpg`]}
            title={`Beautiful &amp; luxurious studio at great location`}
            description={`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`}
            isPremium={true}
            type={`room`}
            rating={4}
            rooms={1}
            guests={2}
            price={100}
            goods={[`Wi-Fi`, `Towels`, `Baby seat`]}
            host={{
              icon: `img/avatar-angelina.jpg`,
              name: `Angelina`,
              isSuper: true
            }}
            reviewList={reviewList}
            coordinates={[]}
            cityCoordinates={[]}
            renderMap={() => {}}
            onClickCardTitle={() => {}}
            renderPlaces={() => {}}
            neighbourhoods={neighbourhoods}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
