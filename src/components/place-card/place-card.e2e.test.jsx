import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from "./place-card";

Enzyme.configure({
  adapter: new Adapter()
});

const place = {
  mark: `premium`,
  img: `img/apartment-01.jpg`,
  value: 120,
  time: `night`,
  isInBookmark: true,
  rating: 5,
  name: `luxurious apartment at great location`,
  type: `Apartment`
};

describe(`PlaceCard component e2e tests`, () => {
  it(`PlaceCard hover callback return place information`, () => {
    const onHoverCallback = jest.fn();

    const placeCardComponent = shallow(
        <PlaceCard place={place} handleHover={onHoverCallback} />
    );

    placeCardComponent.find(`.place-card`).simulate(`mouseEnter`);

    expect(onHoverCallback.mock.calls[0][0]).toMatchObject(place);
  });
});
