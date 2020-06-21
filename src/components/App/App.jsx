import React from "react";
import PropTypes from 'prop-types';
import Main from "../Main/Main";

const App = (props) => {
  const {
    placesAmount,
    placeList
  } = props;

  return (
    <Main
      placesAmount={placesAmount}
      placeList={placeList}
    />
  );
};

App.propTypes = {
  placesAmount: PropTypes.number.isRequired,
  placeList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
