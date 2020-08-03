import React from "react";
import renderer from 'react-test-renderer';
import Review from "./review";

describe(`Review component snapshot tests`, () => {
  it(`Review component show text, date and user information`, () => {
    const tree = renderer
      .create(
          <Review
            rating={4}
            text="A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century."
            userName="Max"
            userIcon="img/avatar-max.jpg"
            date={new Date(`2019-04-24`)}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
