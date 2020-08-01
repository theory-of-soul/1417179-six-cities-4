import {dataOperations, data as reducer} from "./data";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

const initialState = {
  offers: [],
  hasError: false
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
const axiosMock = new MockAdapter(api);
const actions = {
  INIT_OFFERS: `INIT_OFFERS`,
  CHOOSE_CITY: `CHOOSE_CITY`,
  SHOW_ERROR: `SHOW_ERROR`,
};

const responseOffers = [{
  bedrooms: 4,
  city: {name: `Dusseldorf`, location: {latitude: 51.225402, longitude: 6.776314, zoom: 13}},
  description: `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
  goods: [`Laptop friendly workspace`],
  // eslint-disable-next-line camelcase
  host: {id: 25, name: `Angelina`, is_pro: true, avatar_url: `img/avatar-angelina.jpg`},
  id: 1,
  images: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`],
  // eslint-disable-next-line camelcase
  is_favorite: false,
  // eslint-disable-next-line camelcase
  is_premium: false,
  location: {latitude: 51.237402, longitude: 6.797314, zoom: 16},
  // eslint-disable-next-line camelcase
  max_adults: 6,
  // eslint-disable-next-line camelcase
  preview_image: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  price: 235,
  rating: 2.4,
  title: `The house among olive `,
  type: `apartment`,
}];

const adaptedResponseOffers = [{
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

describe(`data reducer tests`, () => {
  it(`if reducer has no state, it returns initialState`, () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it(`set loaded offers`, () => {
    expect(reducer({
      offers: [],
      hasError: false
    }, {
      type: actions.INIT_OFFERS,
      payload: offers
    })).toMatchObject({
      offers,
      hasError: false
    });
  });

  it(`set error flag true`, () => {
    expect(reducer({
      offers: [],
      hasError: false
    }, {
      type: actions.SHOW_ERROR,
      payload: offers
    })).toMatchObject({
      offers: [],
      hasError: true
    });
  });

  it(`check operation load data`, () => {
    const dispatch = jest.fn();
    const loadingHotelOffers = dataOperations.loadHotelOffers();

    axiosMock
      .onGet(`hotels`)
      .reply(200, responseOffers);

    loadingHotelOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.INIT_OFFERS,
          payload: adaptedResponseOffers
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: actions.CHOOSE_CITY,
          payload: `Dusseldorf`
        });
      });
  });

  it(`check fail operation when load data`, () => {
    const dispatch = jest.fn();
    const loadingHotelOffers = dataOperations.loadHotelOffers();

    axiosMock
      .onGet(`hotels`)
      .reply(404, {fake: true});

    loadingHotelOffers(dispatch, () => {}, api)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actions.SHOW_ERROR,
        });
      });
  });

  it(`set error flag true`, () => {
    expect(reducer({
      offers: [],
      hasError: false
    }, {
      type: actions.SHOW_ERROR,
      payload: offers
    })).toMatchObject({
      offers: [],
      hasError: true
    });
  });
});
