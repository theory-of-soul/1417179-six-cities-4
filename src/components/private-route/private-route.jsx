import React from "react";
import PropTypes from 'prop-types';
import {Redirect, Route} from "react-router-dom";
import {AppUrls} from "../../app-urls";
import {connect} from "react-redux";
import {isUserAuth} from "../../reducers/user/selectors";

const PrivateRoute = (props) => {
  const {render, path, exact = false, isUserAuthorized} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          isUserAuthorized ? render() : <Redirect to={AppUrls.AUTH} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isUserAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isUserAuthorized: isUserAuth(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(React.memo(PrivateRoute));
