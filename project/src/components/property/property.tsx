import { useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {connect, ConnectedProps} from 'react-redux';

import {
  fetchOneOfferAction,
  fetchOfferNearbyAction,
  fetchOfferCommentsAction
} from '../../store/api-actions';
import { sendFavoriteAction } from '../../store/api-actions';
import { getComments, getLoadOneOfferError, getNearbyOffers, getOneOffer } from '../../store/offer-reducer/selectors';
import { getAuthorizationStatus } from '../../store/user-reduser/selectors';

import CardList from '../card-list/card-list';
import FormComment from '../form-comment/form-comment';
import Map from '../map/map';
import NotFound404 from '../not-found-404/not-found-404';
import ReviewsList from '../reviews-list/reviews-list';
import Header from '../header/header';

// import type {CardOne} from '../../types/cardInfo';
import PropertyProps from './type';
import {State} from '../../types/state';

import { AuthorizationStatus, AppRoute } from '../../const';

const mapStateToProps = (state: State) => ({
  oneOffer: getOneOffer(state),
  comments: getComments(state),
  nearbyOffers: getNearbyOffers(state),
  loadOneOfferError: getLoadOneOfferError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Property ({loadOneOfferError, cardInfo, oneOffer, nearbyOffers, comments, authorizationStatus}: PropertyProps & PropsFromRedux): JSX.Element {

  const history = useHistory();
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    dispatch(fetchOneOfferAction(id));
    dispatch(fetchOfferNearbyAction(id));
    dispatch(fetchOfferCommentsAction(id));
  }, [dispatch, id, oneOffer]);


  const handleFavorites = () => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      dispatch(sendFavoriteAction(oneOffer.id, oneOffer.isFavorite));
      return;
    }
    history.push(AppRoute.SignIn);
  };


  // const [selectedPoint, setSelectedPoint] = useState<CardOne | undefined>(undefined);

  // const onListItemHover = (activeId: number) => {
  //   const currentPoint = cardInfo?.find((point) => point.id === activeId);

  //   // setSelectedPoint(currentPoint);
  // };

  const propertyItem = oneOffer;

  return (
    <div className="page">
      <Header />
      {loadOneOfferError ? <NotFound404 /> : (
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {propertyItem?.images.map((item, i) => (
                  <div key={`${propertyItem?.id}${item}`} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {propertyItem?.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ''}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {propertyItem?.title}
                  </h1>
                  <button
                    className={`${oneOffer.isFavorite? 'property__bookmark-button--active': ''} property__bookmark-button button`}
                    type="button"
                    onClick={handleFavorites}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${propertyItem ? Math.round(propertyItem.rating)*100/5 : 0}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{propertyItem?.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {propertyItem?.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {propertyItem?.bedrooms}
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {propertyItem?.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{propertyItem?.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      propertyItem?.goods.map((item) => (
                        <li key={`${propertyItem.id}${item}`} className="property__inside-item">
                          {item}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src= {propertyItem?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {propertyItem?.host.name}
                    </span>
                    {propertyItem?.host.isPro ?
                      <span className="property__user-status">
                        Pro
                      </span>
                      : ''}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {propertyItem?.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList reviews = {comments} />
                  {authorizationStatus === AuthorizationStatus.Auth ?
                    <FormComment id={id} /> : ''}
                </section>
              </div>
            </div>

            <Map
              city={oneOffer.city}
              cardInfo={nearbyOffers}
              selectedPoint={undefined}
              classIn = {'property__map map'}
              styleIn = {{
                height: '100%',
                minHeight: '579px',
              }}
            />

          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <CardList
                  cardInfo={nearbyOffers}
                  onListItemHover={undefined}
                />
              </div>

            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export {Property};
export default connector(Property);
