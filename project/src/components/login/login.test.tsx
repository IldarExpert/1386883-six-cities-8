import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {Provider} from 'react-redux';
import { Router } from 'react-router';
import Login from './login';
import {AuthorizationStatus} from '../../const';
import type {State} from '../../types/state';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../services/api';
import userEvent from '@testing-library/user-event';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
State,
Action,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: AuthScreen', () => {
  it('should render "AuthScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect (screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect (screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/test@test\.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

  });
});
