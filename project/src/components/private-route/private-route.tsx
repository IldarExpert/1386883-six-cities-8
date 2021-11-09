import {Route, Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import { State } from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRouteProps from './type';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PrivateRoute (props: PrivateRouteProps & PropsFromRedux): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact = {exact}
      path = {path}
      render = { () => (
        authorizationStatus === AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
