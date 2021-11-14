import {ActionType} from '../types/action';
import { AuthorizationStatus } from '../const';
import { CardOneFromServer } from '../types/cardInfo';
import { ReviewFromServer } from '../types/reviews';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCurrentCity,
  payload: city,
} as const);

export const sortCardListAction = (sortItem: string) => ({
  type: ActionType.SortCardList,
  payload: sortItem,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const loadCityList = (cityList: CardOneFromServer[]) => ({
  type: ActionType.LoadCityList,
  payload: cityList,
} as const);

export const loadOneOffer = (oneOffer: CardOneFromServer) => ({
  type: ActionType.LoadOneCity,
  payload: oneOffer,
} as const);

export const loadNearby = (cityListNearby: CardOneFromServer[]) => ({
  type: ActionType.LoadNearby,
  payload: cityListNearby,
} as const);

export const loadComments = (comments: ReviewFromServer[]) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const loadOneOfferError = () => ({
  type: ActionType.LoadOneOfferError,
} as const);

export const changeLoadCommentsStatus = (status: string) => ({
  type: ActionType.ChangeLoadCommentsStatus,
  payload: status,
} as const);
