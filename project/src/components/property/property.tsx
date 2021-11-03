import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import CardList from '../card-list/card-list';
import FormComment from '../form-comment/form-comment';
import Map from '../map/map';
import PropertyProps from './type';
import ReviewsList from '../reviews-list/reviews-list';
import type {CardOne} from '../../types/cardInfo';
import {State} from '../../types/state';


const mapStateToProps = ({cardList}: State) => ({
  cardInfo: cardList,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function Property ({reviews, cardInfo}: PropertyProps & PropsFromRedux): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<CardOne | undefined>(undefined);

  const onListItemHover = (activeId: number) => {
    const currentPoint = cardInfo.find((point) => point.id === activeId);

    setSelectedPoint(currentPoint);
  };

  const {id} = useParams<{id: string}>();
  const propertyItem = cardInfo.find((item) => item.id === Number(id));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link"
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

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {propertyItem?.images.map((item) => (
                <div key={propertyItem?.id} className="property__image-wrapper">
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
                <button className="property__bookmark-button button" type="button">
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
                      <li key={propertyItem.id} className="property__inside-item">
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
                <ReviewsList reviews = {reviews} />
                <FormComment />
              </section>
            </div>
          </div>

          <Map
            city={cardInfo[0].city}
            cardInfo={cardInfo.slice(0, 3)}
            selectedPoint={selectedPoint}
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
                cardInfo={cardInfo.slice(0, 3)}
                onListItemHover={onListItemHover}
              />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export {Property};
export default connector(Property);
