import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {AppUrls} from "../../app-urls";

const MainWrapper = (props) => {
  const {
    isUserAuth,
    className = ``,
    pageClassName = ``,
    children,
    userEmail = ``,
    hasFooter = false
  } = props;

  let pageMainStyle = `page__main page__main--index`;
  if (className) {
    pageMainStyle += ` ${className}`;
  }

  let pageStyle = `page`;
  if (pageClassName) {
    pageStyle += ` ${pageClassName}`;
  }

  return (
    <div className={pageStyle}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppUrls.BASE} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={isUserAuth ? AppUrls.FAVORITES : AppUrls.AUTH} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {
                      isUserAuth ?
                        <span className="header__user-name user__name">{userEmail}</span> :
                        <span className="header__login">Sign in</span>
                    }
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={pageMainStyle}>
        {children}
      </main>

      {
        hasFooter && (
          <footer className="footer container">
            <Link to={AppUrls.BASE} className="footer__logo-link">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
            </Link>
          </footer>
        )
      }
    </div>
  );
};

MainWrapper.propTypes = {
  isUserAuth: PropTypes.bool.isRequired,
  className: PropTypes.string,
  pageClassName: PropTypes.string,
  userEmail: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasFooter: PropTypes.bool
};

export default React.memo(MainWrapper);
