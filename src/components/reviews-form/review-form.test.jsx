import React from "react";
import renderer from 'react-test-renderer';
import ReviewsForm from "./reviews-form";

describe(`ReviewsForm component snapshot tests`, () => {
  it(`ReviewsForm in active with fill data`, () => {
    const tree = renderer
      .create(
          <ReviewsForm
            isActiveSubmit={true}
            onChangeRatingHandler={() => {}}
            onChangeTextReviewHandler={() => {}}
            onSubmitHandler={() => {}}
            isFormDisabled={false}
            reviewRating={3}
            reviewText={`any text`}
            addReviewError={null}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`ReviewsForm inactive with error`, () => {
    const tree = renderer
      .create(
          <ReviewsForm
            isActiveSubmit={false}
            onChangeRatingHandler={() => {}}
            onChangeTextReviewHandler={() => {}}
            onSubmitHandler={() => {}}
            isFormDisabled={true}
            reviewRating={3}
            reviewText={`any text`}
            addReviewError={`Has server error`}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
