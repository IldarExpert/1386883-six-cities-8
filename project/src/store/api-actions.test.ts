import {Action} from 'redux';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import type {State} from '../types/state';
import type {AuthData} from '../types/auth-data';
import { ApiRoute, AuthorizationStatus } from '../const';
import {requireAuthorization, saveAuthData} from './action';
import {checkAuthAction, loginAction} from './api-actions';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should change "auth" status when server return status "200"', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, {
        'avatar_url': '',
        email: '',
        id: 0,
        'is_pro': false,
        name: '',
        token: '',
      });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      saveAuthData({
        'avatar_url': '',
        email: '',
        id: 0,
        'is_pro': false,
        name: '',
        token: '',
      }),
    ]);
  });

  it('should dispatch requireAuthorization and saveAuthData when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    const store = mockStore();

    mockAPI
      .onPost(ApiRoute.Login)
      .reply(200, {
        'avatar_url': '',
        email: '',
        id: 0,
        'is_pro': false,
        name: '',
        token: 'secret',
      });

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      saveAuthData({
        'avatar_url': '',
        email: '',
        id: 0,
        'is_pro': false,
        name: '',
        token: 'secret',
      }),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('6-cityes-token', 'secret');

  });
});


