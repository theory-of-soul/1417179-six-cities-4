import React from "react";
import PropTypes from 'prop-types';
import MainWrapper from "../main-wrapper/main-wrapper";

const MainLoginWrapper = (props) => (
  <MainWrapper {...props} pageClassName="page--gray page--login" />
);

MainLoginWrapper.propTypes = {
  isUserAuth: PropTypes.bool.isRequired,
  className: PropTypes.string,
  userEmail: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasFooter: PropTypes.bool
};

export default React.memo(MainLoginWrapper);
