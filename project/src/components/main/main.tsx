import {useState} from 'react';
// import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';

import {changeCity, sortCardListAction} from '../../store/action';

import CardList from '../card-list/card-list';
import CityList from '../city-list/city-list';
import Map from '../map/map';
import Header from '../header/header';
import Sort from '../sort/sort';
import MainEmpty from '../main-empty/main-empty';

import {/*AppRoute, AuthorizationStatus,*/ SortTypes} from '../../const';
import type MainProps from './type';
import type {CardOne} from '../../types/cardInfo';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import { getCardList, getCity, getIsDataLoaded, getSortItem } from '../../store/offer-List-reduser/selectors';


const mapStateToProps = (state: State) => ({
  city: getCity(state),
  cardList: getCardList(state),
  sortItem: getSortItem(state),
  isDataLoaded: getIsDataLoaded(state),
  // authorizationStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onClickCity (city: string) {
    dispatch(changeCity(city));
  },
  onClickSort (sortItem: string) {
    dispatch(sortCardListAction(sortItem));
  },
});

const sortCardList = (sortItem: string, cardList: CardOne[]) => {
  switch (sortItem) {
    case SortTypes[1]:
      return [...cardList].sort((a, b) => a.price - b.price);
    case SortTypes[2]:
      return [...cardList].sort((a, b) => b.price - a.price);
    case SortTypes[3]:
      return [...cardList].sort((a, b) => b.rating - a.rating);
    default:
      return cardList;
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function Main ({cardInfo, cardList, city, onClickCity, sortItem, onClickSort, isDataLoaded /*, authorizationStatus*/}: ConnectedComponentProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<CardOne | undefined>(undefined);

  const onListItemHover = (activeId: number) => {
    const currentPoint = cardInfo.find((point) => point.id === activeId);

    setSelectedPoint(currentPoint);
  };

  const cardlistIsEmty = cardList.length === 0 && isDataLoaded;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main ${cardlistIsEmty? 'page__main--index-empty' : 'page__main--index'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList onClickCity={onClickCity} city={city}/>
        </div>
        <div className="cities">
          {cardlistIsEmty?
            <MainEmpty /> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cardList.length} places to stay in {city}</b>
                <Sort
                  sortItem={sortItem}
                  onClickSort={onClickSort}
                />
                <div className="cities__places-list places__list tabs__content">
                  <CardList
                    cardInfo={sortCardList(sortItem, cardList)}
                    onListItemHover={onListItemHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                {cardList[0] ?
                  <Map
                    city={cardList[0].city}
                    cardInfo={cardList}
                    selectedPoint={selectedPoint}
                    classIn = {'cities__map map'}
                    styleIn = {{
                      height: '100%',
                      minHeight: '500px',
                    }}
                  />
                  : ''}
              </div>
            </div> }
        </div>
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
