import PropTypes from "prop-types";

export const offerType = PropTypes.shape({
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
}).isRequired;
