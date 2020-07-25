import React from "react";
import PropTypes from 'prop-types';

const MainWrapper = (props) => {
  const {
    onLogoLinkClickHandler,
    isUserAuth,
    onLoginClickHandler,
    className = ``,
    children
  } = props;

  let pageMainStyle = `page__main page__main--index`;
  if (className) {
    pageMainStyle += ` ${className}`;
  }

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

      <main className={pageMainStyle}>
        {children}
      </main>
    </div>
  );
};

MainWrapper.propTypes = {
  onLogoLinkClickHandler: PropTypes.func.isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  onLoginClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default React.memo(MainWrapper);
