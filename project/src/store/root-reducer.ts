import { combineReducers } from 'redux';

import { offerReducer } from './offer-reducer/offer-reducer';
import { offerListReduser } from './offer-List-reduser/offer-List-reduser';
import { favoritesReducer } from './favorites-reducer/favorites-reducer';
import { userReduser } from './user-reduser/user-reduser';

export enum NameSpace {
  offer = 'OFFER',
  offers = 'OFFER_LIST',
  favorites = 'FAVORITES',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.offer]: offerReducer,
  [NameSpace.offers]: offerListReduser,
  [NameSpace.favorites]: favoritesReducer,
  [NameSpace.user]: userReduser,
});

export type RootState = ReturnType<typeof rootReducer>;
