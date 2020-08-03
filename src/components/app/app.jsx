import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getHasErrorFlag, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity} from "../../reducers/app/selectors";
import {operationCreator} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PlaceProperty from "../place-property/place-property";

const MainScreenWithMap = withMap(Main);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePlace: null
    };

    this._renderApp = this._renderApp.bind(this);
    this._showPlaceProperties = this._showPlaceProperties.bind(this);
  }

  componentDidMount() {
    this.props.loadHotelOffers();
  }

  _showPlaceProperties(place) {
    this.setState({activePlace: place});
  }

  _renderApp() {
    const {
      placesAmount,
      placeList,
      activeCity,
      cityList,
      chooseCity,
      dataLoadingError
    } = this.props;

    if (this.state.activePlace) {
      const {
        images,
        name,
        description,
        isPremium,
        type,
        rating,
        bedrooms,
        guests,
        value,
        goods,
        host
      } = this.state.activePlace;
      return (
        <PlaceProperty
          images={images}
          title={name}
          description={description}
          isPremium={isPremium}
          type={type}
          rating={rating}
          rooms={bedrooms}
          guests={guests}
          price={value}
          goods={goods}
          host={host}
        />
      );
    } else {
      return (
        <MainScreenWithMap
          placesAmount={placesAmount}
          placeList={placeList}
          activeCity={activeCity}
          cityList={cityList}
          onCityClickHandler={chooseCity}
          hasError={dataLoadingError}
          onLogoLinkClickHandler={() => {}}
          onClickCardTitle={this._showPlaceProperties}
        />
      );
    }

  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
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
            />
          </Route>
        </Switch>
      </BrowserRouter>
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
  dataLoadingError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  placesAmount: getCurrentCityOffers(state).length,
  placeList: getCurrentCityOffers(state),
  activeCity: getCurrentCity(state),
  cityList: getUniqCities(state),
  dataLoadingError: getHasErrorFlag(state)
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
