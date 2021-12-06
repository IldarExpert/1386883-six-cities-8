import {useRef, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { State } from '../../types/state';
import type {ThunkAppDispatch} from '../../types/action';
import { AuthData } from '../../types/auth-data';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getAuthorizationStatus } from '../../store/user-reduser/selectors';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onsubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Login ({onsubmit, authorizationStatus}: PropsFromRedux): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onsubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handleValidityInput = (evt: FormEvent<HTMLFormElement>) => {
    let countPasswordWord = 0;
    let countPasswordNumber = 0;
    if (passwordRef.current !== null){
      if(/[A-Z]/.test(passwordRef.current.value)) {countPasswordWord++;}
      if(/[a-z]/.test(passwordRef.current.value)) {countPasswordWord++;}
      if(/[А-Я]/.test(passwordRef.current.value)) {countPasswordWord++;}
      if(/[а-я]/.test(passwordRef.current.value)) {countPasswordWord++;}
      if (countPasswordWord === 0) {
        passwordRef.current.setCustomValidity('Пароль должен содержать как минимум 1 букву');
      }

      if(/\d/.test(passwordRef.current.value)) {countPasswordNumber++;}
      if (countPasswordNumber === 0) {
        passwordRef.current.setCustomValidity('Пароль должен содержать как минимум 1 цифру');
      }

      if (countPasswordNumber !== 0 && countPasswordWord !== 0) {
        passwordRef.current.setCustomValidity('');
      }
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    history.push(AppRoute.Main);
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link"
                to="/"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
              onChange={handleValidityInput}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref = {loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid = "email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref = {passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export {Login};
export default connector(Login);
