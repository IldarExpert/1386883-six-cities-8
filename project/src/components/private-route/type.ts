import {RouteProps} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
  authorizationStatus: AuthorizationStatus,
}

export default PrivateRouteProps;
