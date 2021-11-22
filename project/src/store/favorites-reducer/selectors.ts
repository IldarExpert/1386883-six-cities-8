import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { CardList } from '../../types/cardInfo';

export const getFavoritesCardList = (state: State): CardList => state[NameSpace.favorites].favoritesCardList;
