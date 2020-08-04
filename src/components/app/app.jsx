import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getHasErrorFlag, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity, getCurrentSorting} from "../../reducers/app/selectors";
import {operationCreator} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PlaceProperty from "../place-property/place-property";
import withPlaceCardList from "../../hoc/with-place-card-list";
import {isUserAuth} from "../../reducers/user/selectors";
import LogIn from "../log-in/log-in";
import {userOperations} from "../../reducers/user/user";
import {Sorting} from "../places-sorting/places-sorting";
import withActiveItem from "../../hoc/with-active-item";
import MainWrapper from "../main-wrapper/main-wrapper";
import MainEmpty from "../main-empty/main-empty";

const MainScreenWithMap = withMap(withActiveItem((withPlaceCardList(Main))));
const PlacePropertyWithMap = withMap(withActiveItem(withPlaceCardList(PlaceProperty)));

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePlace: null,
      isLoginPage: false
    };

    this._renderApp = this._renderApp.bind(this);
    this._showPlaceProperties = this._showPlaceProperties.bind(this);
    this._onLoginLinkClickHandler = this._onLoginLinkClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.loadHotelOffers();
  }

  componentDidUpdate(prevProps) {
    // временное решения, до использования роутинга
    if (prevProps.isUserAuthorized !== this.props.isUserAuthorized && this.props.isUserAuthorized) {
      this.setState({isLoginPage: false});
    }
  }

  _showPlaceProperties(place) {
    this.setState({activePlace: place});
  }

  _onLoginLinkClickHandler() {
    this.setState({isLoginPage: true});
  }

  _renderApp() {
    const {
      placesAmount,
      placeList,
      activeCity,
      cityList,
      chooseCity,
      dataLoadingError,
      isUserAuthorized,
      chosenSorting,
      chooseSorting
    } = this.props;

    if (this.state.isLoginPage) {
      return (<LogIn onSubmitHandler={this.props.signIn}/>);
    }

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
        host,
        point,
        cityLocation
      } = this.state.activePlace;
      return (
        <PlacePropertyWithMap
          title={name}
          images={images}
          description={description}
          isPremium={isPremium}
          type={type}
          rating={rating}
          rooms={bedrooms}
          guests={guests}
          price={value}
          goods={goods}
          host={host}
          reviewList={[]}
          coordinates={point}
          cityCoordinates={cityLocation}
          mapClassName="property__map"
          placeListClassName="near-places__list"
          onClickCardTitle={this._showPlaceProperties}
          neighbourhoods={placeList.filter((place) => place.name !== name)}
        />
      );
    } else {
      if (placesAmount === 0) {
        return (
          <MainWrapper
            isUserAuth={isUserAuthorized}
            onLogoLinkClickHandler={() => {}}
            onLoginClickHandler={this._onLoginLinkClickHandler}
            className="page__main--index-empty"
          >
            <MainEmpty />
          </MainWrapper>
        );
      } else {
        return (
          <MainWrapper
            isUserAuth={isUserAuthorized}
            onLogoLinkClickHandler={() => {}}
            onLoginClickHandler={this._onLoginLinkClickHandler}
          >
            <MainScreenWithMap
              placesAmount={placesAmount}
              placeList={placeList}
              activeCity={activeCity}
              cityList={cityList}
              onCityClickHandler={chooseCity}
              hasError={dataLoadingError}
              onClickCardTitle={this._showPlaceProperties}
              placeListClassName="cities__places-list"
              mapClassName="cities__map"
              chosenSorting={chosenSorting}
              onChooseSortingHandler={chooseSorting}
              onActiveHandler={() => {}}
            />
          </MainWrapper>
        );
      }
    }

  }

  render() {
    const {
      placeList
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            <PlacePropertyWithMap
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
              reviewList={[]}
              cityCoordinates={[52.38333, 4.9]}
              coordinates={[52.3909553943508, 4.85309666406198]}
              mapClassName="property__map"
              placeListClassName="near-places__list"
              neighbourhoods={placeList}
              onClickCardTitle={this._showPlaceProperties}
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
  isUserAuthorized: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  chooseSorting: PropTypes.func.isRequired,
  chosenSorting: PropTypes.oneOf(Object.values(Sorting)).isRequired,
};

const mapStateToProps = (state) => ({
  placesAmount: getCurrentCityOffers(state).length,
  placeList: getCurrentCityOffers(state),
  activeCity: getCurrentCity(state),
  cityList: getUniqCities(state),
  dataLoadingError: getHasErrorFlag(state),
  isUserAuthorized: isUserAuth(state),
  chosenSorting: getCurrentSorting(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadHotelOffers: () => {
    dispatch(operationCreator.loadHotelOffers());
  },
  chooseCity: (city) => {
    dispatch(appActionCreator.setCity(city));
  },
  signIn: (email, password) => {
    dispatch(userOperations.login(email, password));
  },
  chooseSorting: (sorting) => {
    dispatch(appActionCreator.chooseSorting(sorting));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
