import React from "react";
import PropTypes from 'prop-types';

export const Sorting = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

const typeOfSorting = Object.values(Sorting);

const PlacesSorting = (props) => {
  const {
    chosenSorting,
    isOpened,
    onOpenHandler,
    onChooseSortingHandler
  } = props;

  let styleOptions = `places__options places__options--custom`;
  if (isOpened) {
    styleOptions += ` places__options--opened`;
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onOpenHandler}>
        {chosenSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={styleOptions}>
        {
          typeOfSorting.map((type) => {
            let style = `places__option`;
            if (type === chosenSorting) {
              style += ` places__option--active`;
            }
            return (
              <li
                key={type}
                className={style}
                tabIndex="0"
                onClick={() => {
                  onChooseSortingHandler(type);
                  onOpenHandler();
                }}
              >
                {type}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
};

PlacesSorting.propTypes = {
  chosenSorting: PropTypes.oneOf(Object.values(Sorting)).isRequired,
  onOpenHandler: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onChooseSortingHandler: PropTypes.func.isRequired,
};

export default React.memo(PlacesSorting);
