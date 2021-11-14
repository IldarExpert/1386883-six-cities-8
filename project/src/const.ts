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

export enum LoadCommentsStatus {
  Posted = 'POSTED',
  Error = 'ERROR',
  UnSet = 'UNSET',
  Loading = 'LOADING',
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const Ratings = [
  {
    title: 'perfect',
    value: '5',
  },
  {
    title: 'good',
    value: '4',
  },
  {
    title: 'not bad',
    value: '3',
  },
  {
    title: 'badly',
    value: '2',
  },
  {
    title: 'terribly',
    value: '1',
  },
] as const;


export const SortTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
