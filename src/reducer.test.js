import {reducer, cities, actions} from "./reducer";

const initialState = {
  city: null,
  offers: [],
  cityOffers: []
};

const offers = [{
  id: 0,
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`,
  city: `Cologne`,
}, {
  id: 1,
  mark: `premium`,
  img: `img/apartment-02.jpg`,
  value: 200,
  time: `night`,
  isInBookmark: false,
  rating: 4,
  name: `Beautiful & luxurious`,
  type: `Hotel`,
  city: `Paris`,
}, {
  id: 2,
  img: `img/apartment-03.jpg`,
  value: 100,
  time: `night`,
  isInBookmark: false,
  rating: 3.5,
  name: `Beautiful`,
  type: `Apartment`,
  city: `Brussels`,
}, {
  id: 3,
  img: `img/apartment-01.jpg`,
  value: 40,
  time: `night`,
  isInBookmark: false,
  rating: 2,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  city: `Amsterdam`,
}, {
  id: 4,
  img: `img/apartment-01.jpg`,
  value: 40,
  time: `night`,
  isInBookmark: false,
  rating: 2,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  city: `Hamburg`,
}, {
  id: 5,
  img: `img/apartment-01.jpg`,
  value: 40,
  time: `night`,
  isInBookmark: false,
  rating: 2,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  city: `Dusseldorf`,
}, {
  id: 6,
  img: `img/apartment-01.jpg`,
  value: 40,
  time: `night`,
  isInBookmark: false,
  rating: 2,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  city: `Amsterdam`,
}];

describe(`app reducer tests`, () => {
  it(`if reducer has no state, it returns initialState`, () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it(`set all offers`, () => {
    expect(reducer({
      city: null,
      offers: [],
      cityOffers: []
    }, {
      type: actions.SET_OFFERS,
      payload: offers
    })).toMatchObject({
      city: cities.COLOGNE,
      offers,
      cityOffers: [{
        id: 0,
        mark: `premium`,
        img: `img/apartment-01.jpg`,
        value: 120,
        time: `night`,
        isInBookmark: true,
        rating: 5,
        name: `luxurious apartment at great location`,
        type: `Apartment`,
        city: `Cologne`,
      }]
    });
  });

  it(`change city`, () => {
    expect(reducer({
      city: cities.AMSTERDAM,
      offers,
      cityOffers: [{
        id: 3,
        img: `img/apartment-01.jpg`,
        value: 40,
        time: `night`,
        isInBookmark: false,
        rating: 2,
        name: `Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        city: `Amsterdam`,
      }, {
        id: 6,
        img: `img/apartment-01.jpg`,
        value: 40,
        time: `night`,
        isInBookmark: false,
        rating: 2,
        name: `Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        city: `Amsterdam`,
      }]
    }, {
      type: actions.SET_CITY,
      payload: cities.DUSSELDORF,
    })).toMatchObject({
      city: cities.DUSSELDORF,
      offers,
      cityOffers: [{
        id: 5,
        img: `img/apartment-01.jpg`,
        value: 40,
        time: `night`,
        isInBookmark: false,
        rating: 2,
        name: `Beautiful & luxurious apartment at great location`,
        type: `Apartment`,
        city: `Dusseldorf`,
      }]
    });
  });
});
