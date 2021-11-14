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
  sortCardListAction
} from '../store/action';

export enum ActionType {
  ChangeCurrentCity = 'main/changeCurrentCity',
  LoadCityList = 'data/loadCityList',
  LoadOneCity = 'data/loadOneCity',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadComments = 'data/loadComments',
  LoadNearby = 'data/loadNearby',
  LoadOneOfferError = 'data/loadOneOfferError',
  ChangeLoadCommentsStatus = 'review/changeLoadCommentsStatus',
  SortCardList = 'main/sortCardList'
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
| ReturnType<typeof sortCardListAction>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
