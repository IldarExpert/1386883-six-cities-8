import {ActionType} from '../types/action';
import { AuthorizationStatus } from '../const';
import { CardOneFromServer } from '../types/cardInfo';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCurrentCity,
  payload: city,
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
