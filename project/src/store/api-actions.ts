// import {useHistory} from 'react-router-dom';
import {
  loadOneOffer,
  loadCityList,
  requireAuthorization,
  requireLogout,
  loadComments,
  loadNearby,
  loadOneOfferError,
  changeLoadCommentsStatus
} from '../store/action';

import { ThunkActionResult } from '../types/action';
import { CardOneFromServer } from '../types/cardInfo';
import { ReviewFromServer, CommentData } from '../types/reviews';
import { AuthData } from '../types/auth-data';

import { ApiRoute, AuthorizationStatus, LoadCommentsStatus } from '../const';
import { dropToken, saveToken, Token } from '../services/token';

export const fetchOneOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<CardOneFromServer>(`${ApiRoute.Hotels}/${id}`);
      dispatch(loadOneOffer(data));
    } catch {
      dispatch(loadOneOfferError());
    }
  };

export const fetchOfferNearbyAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CardOneFromServer[]>(`${ApiRoute.Hotels}/${id}/nearby`);
    dispatch(loadNearby(data));
  };

export const fetchHotelsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CardOneFromServer[]>(ApiRoute.Hotels);
    dispatch(loadCityList(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(ApiRoute.Login).then((data) => {
      if (data.status) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        return;
      }
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(ApiRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const fetchOfferCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewFromServer[]>(`${ApiRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  };

export const sendCommentAction = ({comment, rating}: CommentData, id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(changeLoadCommentsStatus(LoadCommentsStatus.Loading));
    try {
      const {data} = await api.post<ReviewFromServer[]>(`${ApiRoute.Comments}/${id}`, {comment, rating});
      dispatch(loadComments(data));
      dispatch(changeLoadCommentsStatus(LoadCommentsStatus.Posted));
    } catch {
      dispatch(changeLoadCommentsStatus(LoadCommentsStatus.Error));
    }
  };

export const logoutAction  = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
