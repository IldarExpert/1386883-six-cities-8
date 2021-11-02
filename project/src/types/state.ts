import {CardList} from '../types/cardInfo';
import {AuthorizationStatus} from '../const';

export type State = {
  city: string,
  cardList: CardList,
  cardListAllCity: CardList,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}
