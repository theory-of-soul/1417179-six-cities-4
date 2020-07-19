import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity} from "../../reducers/app/selectors";
import {operationCreator} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";

const MainScreenWithMap = withMap(Main);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadHotelOffers();
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
        cityLocation: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
      }).isRequired
  ).isRequired,
  loadHotelOffers: PropTypes.func.isRequired,
  chooseCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  cityList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  placesAmount: getCurrentCityOffers(state).length,
  placeList: getCurrentCityOffers(state),
  activeCity: getCurrentCity(state),
  cityList: getUniqCities(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadHotelOffers: () => {
    dispatch(operationCreator.loadHotelOffers());
  },
  chooseCity: (city) => {
    dispatch(appActionCreator.setCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
