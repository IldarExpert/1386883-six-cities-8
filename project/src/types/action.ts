import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import { State } from '../types/state';
import {
  changeCity,
  loadCityList,
  loadOneOffer,
  requireAuthorization,
  requireLogout,
  loadComments,
  loadNearby,
  loadOneOfferError,
  changeLoadCommentsStatus,
  sortCardListAction,
  updateFavorites,
  loadFavorites,
  saveAuthData,
  updateNearby,
  updateOneOffer,
  updateCardList
} from '../store/action';

export enum ActionType {
  ChangeCurrentCity = 'offerList/changeCurrentCity',
  LoadCityList = 'offerList/loadCityList',
  LoadOneCity = 'offer/loadOneCity',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadComments = 'offer/loadComments',
  LoadNearby = 'offer/loadNearby',
  LoadOneOfferError = 'offer/loadOneOfferError',
  ChangeLoadCommentsStatus = 'offer/changeLoadCommentsStatus',
  SortCardList = 'offerList/sortCardList',
  UpdateFavorites = 'favorites/updateFavorites',
  LoadFavorites = 'favorites/loadFavorites',
  SaveAuthData = 'user/saveAuthData',
  UpdateNearby = 'offer/updateNearby',
  UpdateOneOffer = 'offer/updateOneOffer',
  UpdateCardList = 'offerList/updateCardList',
}

export type Actions =
| ReturnType<typeof changeCity>
| ReturnType<typeof loadCityList>
| ReturnType<typeof loadOneOffer>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>
| ReturnType<typeof loadComments>
| ReturnType<typeof loadNearby>
| ReturnType<typeof loadOneOfferError>
| ReturnType<typeof changeLoadCommentsStatus>
| ReturnType<typeof sortCardListAction>
| ReturnType<typeof updateFavorites>
| ReturnType<typeof loadFavorites>
| ReturnType<typeof saveAuthData>
| ReturnType<typeof updateNearby>
| ReturnType<typeof updateOneOffer>
| ReturnType<typeof updateCardList>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
