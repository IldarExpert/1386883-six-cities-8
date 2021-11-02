export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';

export const ALL_CITY_LIST = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApiRoute {
  Login = '/login',
  Logout = '/logout',
  Hotels = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
}
