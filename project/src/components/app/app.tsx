import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import NotFound404 from '../not-found-404/not-found-404';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import type AppProps from './type';
import {AppRoute} from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps  = ({authorizationStatus, isDataLoaded, cardListAllCity}: State) => ({
  authorizationStatus,
  isDataLoaded,
  cardInfo: cardListAllCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({cardInfo, reviews, authorizationStatus, isDataLoaded}: AppProps & PropsFromRedux): JSX.Element {
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
          render = {() => <Favorites cardInfo = {cardInfo} />}
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
export default connector(App);
