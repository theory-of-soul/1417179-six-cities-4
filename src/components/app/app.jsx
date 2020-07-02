import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {actionCreator} from "../../reducer";
import offers from "../../mocks/offers";

const MainScreenWithMap = withMap(Main);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setLoadedOffers(offers);
  }

  render() {
    const {
      placesAmount,
      placeList,
      activeCity,
      cityList,
      chooseCity
    } = this.props;

    return (
      <MainScreenWithMap
        placesAmount={placesAmount}
        placeList={placeList}
        activeCity={activeCity}
        cityList={cityList}
        onCityClickHandler={chooseCity}
        onLogoLinkClickHandler={() => {}}
      />
    );
  }
}

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
        point: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired,
  setLoadedOffers: PropTypes.func.isRequired,
  chooseCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
  cityList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const getUniqCities = (placeList) => {
  const allCities = placeList.map((place) => place.city);
  return [...new Set(allCities)];
};

const mapStateToProps = (state) => ({
  placesAmount: state.cityOffers.length,
  placeList: state.cityOffers,
  activeCity: state.city,
  cityList: getUniqCities(state.offers)
});

const mapDispatchToProps = (dispatch) => ({
  setLoadedOffers: (allOffers) => {
    dispatch(actionCreator.setOffers(allOffers));
  },
  chooseCity: (city) => {
    dispatch(actionCreator.setCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
