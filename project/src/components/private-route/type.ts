import {RouteProps} from 'react-router-dom';
import {AuthorizationStatus} from '../../enum';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
  authorizationStatus: AuthorizationStatus,
}

export default PrivateRouteProps;
