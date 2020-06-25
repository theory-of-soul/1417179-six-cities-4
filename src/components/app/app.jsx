import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";

const App = (props) => {
  const {
    placesAmount,
    placeList
  } = props;

  return (
    <Main
      placesAmount={placesAmount}
      placeList={placeList}
      onLogoLinkClickHandler={() => {}}
    />
  );
};

App.propTypes = {
  placesAmount: PropTypes.number.isRequired,
  placeList: PropTypes.arrayOf(
      PropTypes.shape({
        mark: PropTypes.string,
        img: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        isInBookmark: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired
};

export default App;
