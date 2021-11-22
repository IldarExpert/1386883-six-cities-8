import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getAuthorizationStatus, getAuthData } from '../../store/user-reduser/selectors';
import { logoutAction } from '../../store/api-actions';

function Header (): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const authData = useSelector(getAuthData);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.Main}
            >
              {authorizationStatus === AuthorizationStatus.Auth?
                <img
                  className="header__logo"
                  src={authData.avatarUrl}
                  alt="6 cities logo"
                  width="81"
                  height="41"
                /> : ''}
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ?
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{authData.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href={AppRoute.Main}
                      onClick={handleLogOut}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
                :
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.SignIn}
                  >
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
