import React from "react";
import renderer from 'react-test-renderer';
import PlaceProperty from "./place-property";

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
            isUserAuth={true}
            reviewText={``}
            isActiveReviewSubmit={true}
            isReviewFormDisabled={false}
            onReviewFormSubmitHandler={() => {}}
            onChangeRatingHandler={() => {}}
            onChangeTextReviewHandler={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
