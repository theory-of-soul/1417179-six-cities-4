import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getHasErrorFlag, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity, getCurrentSorting} from "../../reducers/app/selectors";
import {operationCreator} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";
import {Route, Router, Switch} from "react-router-dom";
import PlaceProperty from "../place-property/place-property";
import {isUserAuth} from "../../reducers/user/selectors";
import LogIn from "../log-in/log-in";
import {userOperations} from "../../reducers/user/user";
import {Sorting} from "../places-sorting/places-sorting";
import withActiveItem from "../../hoc/with-active-item";
import MainWrapper from "../main-wrapper/main-wrapper";
import MainEmpty from "../main-empty/main-empty";
import {reviewActionCreator, reviewOperations} from "../../reducers/reviews/reviews";
import {
  getDisabledReviewFlag,
  checkActiveReviewSubmit,
  getReviewRating,
  getReviewText, getAddReviewError
} from "../../reducers/reviews/selectors";
import history from "../../history";

const MainScreenWithMap = withMap(withActiveItem(Main));

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
      chooseSorting,
      isReviewFormDisabled,
      sendReview,
      onChangeTextReviewHandler,
      onChangeRatingHandler,
      isActiveReviewSubmit,
      reviewRating,
      reviewText,
      addReviewError
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
        id: offerId
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
          isUserAuth={isUserAuthorized}
          onReviewFormSubmitHandler={() => sendReview(offerId)}
          isReviewFormDisabled={isReviewFormDisabled}
          onChangeTextReviewHandler={onChangeTextReviewHandler}
          onChangeRatingHandler={onChangeRatingHandler}
          isActiveReviewSubmit={isActiveReviewSubmit}
          reviewRating={reviewRating}
          reviewText={reviewText}
          addReviewError={addReviewError}
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
              chosenSorting={chosenSorting}
              onChooseSortingHandler={chooseSorting}
            />
          </MainWrapper>
        );
      }
    }

  }

  render() {
    return (
      <Router history={history}>
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
              isUserAuth={true}
              isActiveReviewSubmit={this.props.isActiveReviewSubmit}
              onReviewFormSubmitHandler={() => {}}
              isReviewFormDisabled={false}
              onChangeTextReviewHandler={this.props.onChangeTextReviewHandler}
              onChangeRatingHandler={this.props.onChangeRatingHandler}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  placesAmount: PropTypes.number.isRequired,
  placeList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
  isReviewFormDisabled: PropTypes.bool.isRequired,
  sendReview: PropTypes.func.isRequired,
  onChangeRatingHandler: PropTypes.func.isRequired,
  onChangeTextReviewHandler: PropTypes.func.isRequired,
  isActiveReviewSubmit: PropTypes.bool.isRequired,
  reviewRating: PropTypes.number,
  reviewText: PropTypes.string.isRequired,
  addReviewError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  placesAmount: getCurrentCityOffers(state).length,
  placeList: getCurrentCityOffers(state),
  activeCity: getCurrentCity(state),
  cityList: getUniqCities(state),
  dataLoadingError: getHasErrorFlag(state),
  isUserAuthorized: isUserAuth(state) || true,
  chosenSorting: getCurrentSorting(state),
  isReviewFormDisabled: getDisabledReviewFlag(state),
  isActiveReviewSubmit: checkActiveReviewSubmit(state),
  reviewRating: getReviewRating(state),
  reviewText: getReviewText(state),
  addReviewError: getAddReviewError(state),
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
  },
  sendReview: (hotelId) => {
    dispatch(reviewOperations.sendReview(hotelId));
  },
  onChangeRatingHandler: (rating) => {
    dispatch(reviewActionCreator.setCommentRating(rating));
  },
  onChangeTextReviewHandler: (text) => {
    dispatch(reviewActionCreator.setCommentText(text));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
