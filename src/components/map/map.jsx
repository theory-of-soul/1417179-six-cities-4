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
    this.icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [21, 30]
    });
    this.zoom = 12;
    this.markerList = [];
    this._updateMap = this._updateMap.bind(this);
    this._getMap = this._getMap.bind(this);
    this._clearMap = this._clearMap.bind(this);
  }

  componentDidMount() {
    this._updateMap();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  render() {
    return (
      <section id="map" className="cities__map map" ref={this.mapRef}/>
    );
  }

  _getMap(city) {
    if (this.map) {
      return this.map;
    } else {
      this.map = leaflet.map(this.mapRef.current, {
        center: city,
        zoomControl: false,
        marker: true,
        zoom: this.zoom
      });

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      return this.map;
    }
  }

  _updateMap() {
    const {
      city,
      markersCoordinates
    } = this.props;

    if (markersCoordinates.length) {
      const map = this._getMap(city);

      this._clearMap();

      map.setView(city, this.zoom);

      markersCoordinates.forEach((offerCords) => {
        const marker = leaflet
          .marker(offerCords, {
            icon: this.icon
          })
          .addTo(map);

        this.markerList.push(marker);
      });
    }
  }

  _clearMap() {
    this.markerList.forEach((marker) => {
      marker.remove();
    });
    this.markerList = [];
  }
}

Map.propTypes = propTypes;

export default Map;
