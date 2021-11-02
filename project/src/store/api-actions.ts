import { ApiRoute, AuthorizationStatus } from '../const';
import { ThunkActionResult } from '../types/action';
import { CardOneFromServer } from '../types/cardInfo';
import {loadCityList, requireAuthorization, requireLogout} from '../store/action';
import { dropToken, saveToken, Token } from '../services/token';
import { AuthData } from '../types/auth-data';

export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CardOneFromServer[]>(ApiRoute.Hotels);
    dispatch(loadCityList(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(ApiRoute.Login).then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(ApiRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction  = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
