import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { sendFavoriteAction } from '../../store/api-actions';
import type {CardProps} from './type';
import { getAuthorizationStatus } from '../../store/user-reduser/selectors';
import { AuthorizationStatus, AppRoute } from '../../const';

function Card({oneCard, onMouseEnter, onMouseLeave}: CardProps): JSX.Element {

  const history = useHistory();
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const handleFavorites = () => {
    authorizationStatus === AuthorizationStatus.Auth?
      dispatch(sendFavoriteAction(oneCard.id, oneCard.isFavorite)):
      history.push(AppRoute.SignIn);
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-id={oneCard.id}
    >
      {oneCard.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ): ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${oneCard.id}`}>
          <img
            className="place-card__image"
            src={oneCard.previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{oneCard.price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`${oneCard.isFavorite? 'place-card__bookmark-button--active': ''} place-card__bookmark-button button`}
            type="button"
            onClick={handleFavorites}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={
                { width: `${Math.round(oneCard.rating)*100/5}%` }
              }
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${oneCard.id}`}>
            {oneCard.title}
          </Link>
        </h2>
        <p className="place-card__type">{oneCard.type}</p>
      </div>
    </article>
  );
}

export default Card;
