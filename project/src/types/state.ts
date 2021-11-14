import {CardList, CardOne} from '../types/cardInfo';
import { Reviews } from '../types/reviews';
import {AuthorizationStatus} from '../const';

export type State = {
  city: string,
  cardList: CardList,
  nearbyOffers: CardList,
  cardListAllCity: CardList,
  oneOffer: CardOne,
  comments: Reviews,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  loadOneOfferError: boolean,
  isCommentPosted: string,
  sortItem: string,
}
