import React from "react";
import PropTypes from 'prop-types';
import MainWrapper from "../main-wrapper/main-wrapper";

const MainIndexWrapper = (props) => (
  <MainWrapper {...props} hasFooter={false} pageClassName="page--gray page--main" />
);

MainIndexWrapper.propTypes = {
  isUserAuth: PropTypes.bool.isRequired,
  className: PropTypes.string,
  userEmail: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasFooter: PropTypes.bool
};

export default React.memo(MainIndexWrapper);
