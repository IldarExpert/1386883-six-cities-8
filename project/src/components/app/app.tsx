import {BrowserRouter, Switch, Route} from 'react-router-dom';
import type AppProps from './type';
import {AppRoute, AuthorizationStatus} from '../../consts';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import NotFound404 from '../not-found-404/not-found-404';
import PrivateRoute from '../private-route/private-route';

function App({numberOfPlaces, CardProperties}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            numberOfPlaces = {numberOfPlaces}
            CardProperties = {CardProperties}
          />
        </Route>
        <Route exact path={AppRoute.Room}>
          <Property />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render = {() =>  <Favorites />}
          authorizationStatus = {AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.SignIn}>
          <Login />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
