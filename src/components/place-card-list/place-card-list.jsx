import React from "react";
import PropTypes from 'prop-types';
import PlaceCard from "../place-card/place-card";

const propTypes = {
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
      }).isRequired
  ).isRequired
};

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
    this.handleHoverCard = this.handleHoverCard.bind(this);
  }

  handleHoverCard(activeCard) {
    this.setState({activeCard});
  }

  render() {
    const {placeList} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          placeList.map((place) => {
            return (
              <PlaceCard
                key={place.id}
                handleHover={this.handleHoverCard}
                place={place}
              />
            );
          })
        }
      </div>
    );
  }
}

PlaceCardList.propTypes = propTypes;

export default PlaceCardList;
