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
    />
  );
};

App.propTypes = {
  placesAmount: PropTypes.number,
  placeList: PropTypes.arrayOf(PropTypes.string)
};

export default App;
