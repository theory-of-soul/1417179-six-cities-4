import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";

const propTypes = {
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
        point: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired
};

const MainScreenWithMap = withMap(Main);

const App = (props) => {
  const {
    placesAmount,
    placeList
  } = props;

  return (
    <MainScreenWithMap
      placesAmount={placesAmount}
      placeList={placeList}
      onLogoLinkClickHandler={() => {}}
    />
  );
};

App.propTypes = propTypes;

export default App;
