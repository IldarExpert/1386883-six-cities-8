import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

import { getFavoritesCardList } from '../../store/favorites-reducer/selectors';
import { fetchFavoriteAction, sendFavoriteAction } from '../../store/api-actions';

import FavoritesCard from '../favorites-card/favorites-card';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Header from '../header/header';
import { CardOne } from '../../types/cardInfo';


function Favorites (): JSX.Element {
  const favoritesCardList = useSelector(getFavoritesCardList);

  const dispatch = useDispatch();

  const handleFavorites = (oneCard: CardOne) => {
    dispatch(sendFavoriteAction(oneCard.id, oneCard.isFavorite));
  };

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  const updatedFavoritesCardList = favoritesCardList.filter((oneCard) => oneCard.isFavorite);

  const uniqueCity: string[] = [];
  updatedFavoritesCardList.forEach((element) => {
    if (!uniqueCity.includes(element.city.name))
    {
      uniqueCity.push(element.city.name);
    }
  });

  return (
    <div className={`page ${favoritesCardList.length === 0? 'page--favorites-empty' : ''}`}>
      <Header />
      {favoritesCardList.length !== 0?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {uniqueCity.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="/#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {updatedFavoritesCardList.map((oneCard) => (
                        oneCard.city.name === city? <FavoritesCard key={`${oneCard.id}FavoritesCard`} oneCard={oneCard} handleFavorites={() => handleFavorites(oneCard)} /> : ''
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main> : <FavoritesEmpty />}
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
