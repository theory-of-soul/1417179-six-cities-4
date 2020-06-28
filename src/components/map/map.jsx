import React, {createRef} from "react";
import PropTypes from 'prop-types';
import * as leaflet from "leaflet";

const propTypes = {
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
  markersCoordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number).isRequired
  ).isRequired
};

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = createRef(null);
  }

  componentDidMount() {
    const zoom = 12;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [21, 30]
    });

    const map = leaflet.map(this.mapRef.current, {
      center: this.props.city,
      zoomControl: false,
      marker: true,
      zoom
    });

    map.setView(this.props.city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this.props.markersCoordinates.forEach((offerCords) => {
      leaflet
        .marker(offerCords, {icon})
        .addTo(map);
    });
  }

  render() {
    return (
      <section id="map" className="cities__map map" ref={this.mapRef}/>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
