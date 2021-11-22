import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { CardList } from '../../types/cardInfo';

export const getCity = (state: State): string => state[NameSpace.offers].city;
export const getCardList = (state: State): CardList => state[NameSpace.offers].cardList;
export const getCardListAllCity = (state: State): CardList => state[NameSpace.offers].cardListAllCity;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.offers].isDataLoaded;
export const getSortItem = (state: State): string => state[NameSpace.offers].sortItem;
