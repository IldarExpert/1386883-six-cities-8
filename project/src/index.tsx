import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/app/app';
// import {reviews} from './mocks/reviews';
import {rootReducer} from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {checkAuthAction, fetchHotelsAction} from './store/api-actions';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {ThunkAppDispatch} from './types/action';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchHotelsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
