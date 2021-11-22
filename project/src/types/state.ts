import {CardList, CardOne} from '../types/cardInfo';
import { Reviews } from '../types/reviews';
import { RootState } from '../store/root-reducer';
import {AuthorizationStatus} from '../const';
import { AuthUserData } from './auth-data';

export type OfferReducer = {
  nearbyOffers: CardList,
  oneOffer: CardOne,
  comments: Reviews,
  isDataLoaded: boolean,
  loadOneOfferError: boolean,
  isCommentPosted: string,
}

export type FavoritesReducer = {
  favoritesCardList: CardList,
}

export type UserReduser = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  authData: AuthUserData,
}

export type OfferListReduser = {
  city: string,
  cardList: CardList,
  cardListAllCity: CardList,
  isDataLoaded: boolean,
  sortItem: string,
}

export type State = RootState;
