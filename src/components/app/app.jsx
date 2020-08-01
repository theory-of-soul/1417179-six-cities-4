import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getHasErrorFlag, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity, getCurrentSorting} from "../../reducers/app/selectors";
import {operationCreator} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";
import {Route, Router, Switch, Redirect} from "react-router-dom";
import PlaceProperty from "../place-property/place-property";
import {getUserEmail, isUserAuth} from "../../reducers/user/selectors";
import LogIn from "../log-in/log-in";
import {userOperations} from "../../reducers/user/user";
import {Sorting} from "../places-sorting/places-sorting";
import withActiveItem from "../../hoc/with-active-item";
import MainWrapper from "../main-wrapper/main-wrapper";
import MainEmpty from "../main-empty/main-empty";
import Favorites from "../favorites/favorites";
import {reviewActionCreator, reviewOperations} from "../../reducers/reviews/reviews";
import {
  getDisabledReviewFlag,
  checkActiveReviewSubmit,
  getReviewRating,
  getReviewText, getAddReviewError
} from "../../reducers/reviews/selectors";
import history from "../../history";
import {AppUrls} from "../../app-urls";

const MainScreenWithMap = withMap(withActiveItem(Main));

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
      addReviewError,
      userEmail
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
            userEmail={userEmail}
            className="page__main--index-empty"
          >
            <MainEmpty />
          </MainWrapper>
        );
      } else {
        return (
          <MainWrapper
            isUserAuth={isUserAuthorized}
            userEmail={userEmail}
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
          <Route exact path={AppUrls.BASE}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppUrls.AUTH}>
            {
              this.props.isUserAuthorized ?
                <Redirect to={AppUrls.BASE} /> :
                <LogIn onSubmitHandler={this.props.signIn}/>
            }
          </Route>
          <Route exact path={AppUrls.FAVORITES}>
            {
              this.props.isUserAuthorized ?
                <Favorites /> :
                <Redirect to={AppUrls.AUTH} />
            }
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
  userEmail: PropTypes.string
};

const mapStateToProps = (state) => ({
  placesAmount: getCurrentCityOffers(state).length,
  placeList: getCurrentCityOffers(state),
  activeCity: getCurrentCity(state),
  cityList: getUniqCities(state),
  dataLoadingError: getHasErrorFlag(state),
  isUserAuthorized: isUserAuth(state),
  chosenSorting: getCurrentSorting(state),
  isReviewFormDisabled: getDisabledReviewFlag(state),
  isActiveReviewSubmit: checkActiveReviewSubmit(state),
  reviewRating: getReviewRating(state),
  reviewText: getReviewText(state),
  addReviewError: getAddReviewError(state),
  userEmail: getUserEmail(state)
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
