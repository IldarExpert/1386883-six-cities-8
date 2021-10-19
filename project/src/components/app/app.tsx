import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFound404 from '../not-found-404/not-found-404';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import type AppProps from './type';
import {AppRoute, AuthorizationStatus} from '../../enum';

function App({numberOfPlaces, cardInfo, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            numberOfPlaces = {numberOfPlaces}
            cardInfo = {cardInfo}
          />
        </Route>
        <Route exact path={AppRoute.Room}>
          <Property
            reviews = {reviews}
            cardInfo = {cardInfo}
          />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render = {() =>  <Favorites cardInfo = {cardInfo} />}
          authorizationStatus = {AuthorizationStatus.Auth}
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
