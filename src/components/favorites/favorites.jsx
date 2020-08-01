import React from "react";
import PropTypes from 'prop-types';
import {offerType} from "../../types/offerType";
import FavoritesPlaceCard from "../favorites-place-card/favorites-place-card";

class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadFavorites();
  }

  render() {
    const {
      favorites,
      addToFavoritesHandler
    } = this.props;

    return (
      <div className="page__favorites-container container">
        {
          favorites.hasFavorites ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  favorites.offers.map((offer) => offer.places.length ? (
                    <li className="favorites__locations-items" key={offer.city} >
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{offer.city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          offer.places.map((place) => {
                            return (
                              <FavoritesPlaceCard
                                key={place.id}
                                onHoverHandler={() => {}}
                                place={place}
                                addToFavorites={addToFavoritesHandler}
                              />
                            );
                          })
                        }
                      </div>
                    </li>
                  ) : null)
                }
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                  trips.</p>
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.shape({
    hasFavorites: PropTypes.bool.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.string.isRequired,
          places: PropTypes.arrayOf(offerType).isRequired
        })
    ).isRequired
  }).isRequired,
  onLoadFavorites: PropTypes.func.isRequired,
  addToFavoritesHandler: PropTypes.func.isRequired,
};

export default React.memo(Favorites);
