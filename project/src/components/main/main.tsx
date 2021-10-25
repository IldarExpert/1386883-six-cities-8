import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {changeCity} from '../../store/action';
import CardList from '../card-list/card-list';
import CityList from '../city-list/city-list';
import Map from '../map/map';
import type MainProps from './type';
import type {CardOne} from '../../types/cardInfo';
import {State} from '../../types/state';
import {Actions} from '../../types/action';

const mapStateToProps = ({city}: State) => ({
  city: city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onClickCity (city: string) {
    dispatch(changeCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main ({cardInfo, city, onClickCity}: ConnectedComponentProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<CardOne | undefined>(undefined);

  const onListItemHover = (activeId: number) => {
    const currentPoint = cardInfo.find((point) => point.id === activeId);

    setSelectedPoint(currentPoint);
  };

  const oneCityOffers = cardInfo.filter((cardOne) => cardOne.city.name === city);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to="/"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList onClickCity={onClickCity} city={city}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{oneCityOffers.length} places to stay in {city}</b>
              <form
                className="places__sorting"
                action="#"
                method="get"
              >
                <span className="places__sorting-caption">Sort by</span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                >
                  Popular
                  <svg
                    className="places__sorting-arrow"
                    width="7"
                    height="4"
                  >
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >
                    Price: low to high
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >
                    Price: high to low
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList
                  cardInfo={oneCityOffers}
                  onListItemHover={onListItemHover}
                />
              </div>
            </section>
            <div className="cities__right-section">
              {oneCityOffers[0] ?
                <Map
                  city={oneCityOffers[0].city}
                  cardInfo={oneCityOffers}
                  selectedPoint={selectedPoint}
                  classIn = {'cities__map map'}
                  styleIn = {{
                    height: '100%',
                    minHeight: '500px',
                  }}
                />
                : ''}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
