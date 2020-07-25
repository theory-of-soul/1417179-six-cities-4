import React from "react";
import PropTypes from 'prop-types';
import PlaceCardList from "../place-card-list/place-card-list";
import CityList from "../city-list/city-list";
import withActiveItem from "../../hoc/with-active-item";
import withOpenMenu from "../../hoc/with-open-menu";
import PlacesSorting, {Sorting} from "../places-sorting/places-sorting";

const MAX_SIZE_CITY_LIST = 6;

const PlaceCardListWithActiveItem = withActiveItem(PlaceCardList);
const PlacesSortingMenu = withOpenMenu(PlacesSorting);

const Main = (props) => {
  const {
    placesAmount,
    placeList,
    cityList,
    activeCity,
    renderMap,
    onLogoLinkClickHandler,
    onCityClickHandler,
    hasError,
    onClickCardTitle,
    isUserAuth,
    onLoginClickHandler,
    chosenSorting,
    onChooseSortingHandler
  } = props;

  const coordinates = placeList.map((place) => place.point);
  const cityCenter = placeList[0] && placeList[0].cityLocation;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" onClick={onLogoLinkClickHandler}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" onClick={onLoginClickHandler}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {
                      isUserAuth ?
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span> :
                        <span className="header__login">Sign in</span>
                    }
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList
              cityList={cityList.slice(0, MAX_SIZE_CITY_LIST)}
              activeCity={activeCity}
              onCityClickHandler={onCityClickHandler}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {
              placesAmount > 0 ? (
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{placesAmount} places to stay in {activeCity}</b>
                  <PlacesSortingMenu chosenSorting={chosenSorting} onChooseSortingHandler={onChooseSortingHandler}/>
                  <PlaceCardListWithActiveItem placeList={placeList} onClickCardTitle={onClickCardTitle} />
                </section>
              ) : (
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    {
                      hasError ? (
                        <>
                          <b className="cities__status">Sorry we have a server problem.</b>
                          <p className="cities__status-description">
                            Try again later.
                          </p>
                        </>
                      ) : (
                        <>
                          <b className="cities__status">No places to stay available</b>
                          <p className="cities__status-description">
                            We could not find any property available at the moment in {activeCity}
                          </p>
                        </>
                      )
                    }
                  </div>
                </section>
              )
            }
            <div className="cities__right-section">
              {renderMap(coordinates, cityCenter)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
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
  cityList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeCity: PropTypes.string.isRequired,
  onLogoLinkClickHandler: PropTypes.func.isRequired,
  onCityClickHandler: PropTypes.func.isRequired,
  renderMap: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  onClickCardTitle: PropTypes.func.isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  onLoginClickHandler: PropTypes.func.isRequired,
  chosenSorting: PropTypes.oneOf(Object.values(Sorting)).isRequired,
  onChooseSortingHandler: PropTypes.func.isRequired
};

export default React.memo(Main);
