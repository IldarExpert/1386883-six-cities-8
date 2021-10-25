import type CityListProps from './type';
import {ALL_CITY_LIST} from '../../const';

function CityList ({onClickCity, city}: CityListProps): JSX.Element {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {ALL_CITY_LIST.map((item, i) => (
          <li
            key={item}
            className="locations__item"
            onClick={(evt) => {
              onClickCity (item);
            }}
          >
            <a
              className={`locations__item-link tabs__item ${item === city ? 'tabs__item--active' : ''}`}
              href="/#"
            >
              <span>{item}</span>
            </a>
          </li>))}
      </ul>
    </section>
  );
}

export default CityList;
