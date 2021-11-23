import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Favorites from '../favorites/favorites';
import Login from '../login/login';
import LoadingScreen from '../loading-screen/loading-screen';
import Main from '../main/main';
import NotFound404 from '../not-found-404/not-found-404';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';

import {AppRoute} from '../../const';

import { getIsDataLoaded } from '../../store/user-reduser/selectors';
import { getCardListAllCity } from '../../store/offer-List-reduser/selectors';
import { getComments } from '../../store/offer-reducer/selectors';


function App(): JSX.Element {
  const cardInfo = useSelector(getCardListAllCity);
  const isDataLoaded = useSelector(getIsDataLoaded);
  const reviews = useSelector(getComments);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            cardInfo={cardInfo}
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
          render = {() => <Favorites />}
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

export {App};
export default (App);
