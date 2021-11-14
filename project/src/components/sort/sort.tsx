import {useState} from 'react';

import { SortTypes } from '../../const';
import SortProps from './type';

function Sort ({sortItem, onClickSort}: SortProps): JSX.Element {
  const [isSortOpen, setSortOpen] = useState(false);

  const toggleSortOpen = () => {
    setSortOpen((prevState) => !prevState);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortOpen}
      >
        {sortItem}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortOpen?
        <ul className="places__options places__options--custom places__options--opened">
          {SortTypes.map((item) => (
            <li
              className={`places__option ${sortItem === item? 'places__option--active': ''}`}
              tabIndex={0}
              key={item}
              onClick={(evt) => {onClickSort(item); toggleSortOpen();}}
            >
              {item}
            </li>
          ))}

        </ul> : ''}
    </form>
  );
}

export default Sort;
