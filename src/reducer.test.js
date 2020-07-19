import {operationCreator, reducer} from "./reducer";
import {createAPI} from "./api";
import MockAdapter from "axios-mock-adapter";

const initialState = {
  city: `Amsterdam`,
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
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
  cityLocation: [52.38333, 4.9]
}];

const api = createAPI(() => {});
const actions = {
  INIT_OFFERS: `INIT_OFFERS`
};

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
      type: actions.INIT_OFFERS,
      payload: offers
    })).toMatchObject({
      city: `Cologne`,
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
      city: `Amsterdam`,
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
        cityLocation: [52.38333, 4.9]
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
        cityLocation: [52.38333, 4.9]
      }]
    }, {
      type: actions.CHOOSE_CITY,
      payload: `Dusseldorf`,
    })).toMatchObject({
      city: `Dusseldorf`,
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
        cityLocation: [52.38333, 4.9]
      }]
    });
  });

  it(`check operation load data`, () => {
    const axiosMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadingHotelOffers = operationCreator.loadHotelOffers();

    axiosMock
      .onGet(`hotels`)
      .reply(200, [{fake: true}]);

    loadingHotelOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.INIT_OFFERS,
          payload: [{fake: true}]
        });
      });
  });
});
