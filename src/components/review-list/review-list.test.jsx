import React from "react";
import renderer from 'react-test-renderer';
import ReviewList from "./review-list";

const reviewList = [{
  id: 0,
  rating: 2,
  text: `It was a pain. Wi-Fi was soooo low.`,
  date: new Date(`2020-06-10`),
  userName: `Alex`,
  userIcon: `img/avatar-max.jpg`
}];

describe(`ReviewList component snapshot tests`, () => {
  it(`ReviewList with empty list`, () => {
    const tree = renderer
      .create(
          <ReviewList reviewList={[]}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`ReviewList with one review`, () => {
    const tree = renderer
      .create(
          <ReviewList reviewList={reviewList}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
