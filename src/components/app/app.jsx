import React from "react";
import PropTypes from 'prop-types';
import Main from "../main/main";
import withMap from "../../hoc/with-map";
import {connect} from "react-redux";
import {getCurrentCityOffers, getFavoriteOffers, getHasErrorFlag, getUniqCities} from "../../reducers/data/selectors";
import {getCurrentCity, getCurrentSorting} from "../../reducers/app/selectors";
import {dataOperations} from "../../reducers/data/data";
import {appActionCreator} from "../../reducers/app/app";
import {Route, Router, Switch} from "react-router-dom";
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
import PrivateRoute from "../private-route/private-route";
import {offerType} from "../../types/offerType";
import MainIndexWrapper from "../main-index-wrapper/main-index-wrapper";

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
      userEmail,
      addToFavorites
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
          <MainIndexWrapper
            isUserAuth={isUserAuthorized}
            userEmail={userEmail}
            className="page__main--index-empty"
          >
            <MainEmpty />
          </MainIndexWrapper>
        );
      } else {
        return (
          <MainIndexWrapper
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
              addToFavorites={addToFavorites}
            />
          </MainIndexWrapper>
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
            <LogIn onSubmitHandler={this.props.signIn}/>
          </Route>
          <PrivateRoute
            exact
            path={AppUrls.FAVORITES}
            render={() => (
              <MainWrapper
                isUserAuth={this.props.isUserAuthorized}
                userEmail={this.props.userEmail}
                className={`page__main--favorites ${this.props.favoriteOffers.hasFavorites ? `` : `page__main--favorites-empty`}`}
                hasFooter={true}
              >
                <Favorites
                  favorites={this.props.favoriteOffers}
                  onLoadFavorites={this.props.loadFavorites}
                />
              </MainWrapper>
            )}
          />
          <Route exact path={`/dev`}>
            <MainWrapper
              isUserAuth={this.props.isUserAuthorized}
              userEmail={this.props.userEmail}
              className={`page__main--favorites ${this.props.favoriteOffers.hasFavorites ? `` : `page__main--favorites-empty`}`}
              hasFooter={true}
            >
              <Favorites
                favorites={this.props.favoriteOffers}
                onLoadFavorites={this.props.loadFavorites}
              />
            </MainWrapper>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  placesAmount: PropTypes.number.isRequired,
  placeList: PropTypes.arrayOf(offerType).isRequired,
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
  userEmail: PropTypes.string,
  addToFavorites: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.shape({
    hasFavorites: PropTypes.bool.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string.isRequired,
          places: PropTypes.arrayOf(offerType).isRequired
        })
    ).isRequired
  }).isRequired,
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
  userEmail: getUserEmail(state),
  favoriteOffers: getFavoriteOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadHotelOffers: () => {
    dispatch(dataOperations.loadHotelOffers());
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
  },
  addToFavorites: (hotelId, isFavorite) => {
    dispatch(dataOperations.addToFavorites(hotelId, isFavorite));
  },
  loadFavorites: () => {
    dispatch(dataOperations.loadFavorites());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
