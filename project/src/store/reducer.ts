import {DEFAULT_CITY} from '../const';
import {ActionType, Actions} from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus, LoadCommentsStatus, SortTypes } from '../const';
import {convertCityList, convertOneCity, convertComments} from '../services/adapter';
// import { CardOne } from '../types/cardInfo';


const initialState = {
  city: DEFAULT_CITY,
  cardList: [],
  cardListAllCity: [],
  oneOffer: {
    'bedrooms': 0,
    'city': {
      'location': {
        'latitude': 0,
        'longitude': 0,
        'zoom': 0,
      },
      'name': '',
    },
    'description': '',
    'goods': [],
    'host': {
      'avatarUrl': '',
      'id': 0,
      'isPro': false,
      'name': '',
    },
    'id': 0,
    'images': [],
    'isFavorite': false,
    'isPremium': false,
    'location': {
      'latitude': 0,
      'longitude': 0,
      'zoom': 0,
    },
    'maxAdults': 0,
    'previewImage': '',
    'price': 0,
    'rating': 0,
    'title': '',
    'type': '',
  },
  nearbyOffers: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  loadOneOfferError: false,
  isDataLoaded: false,
  isCommentPosted: LoadCommentsStatus.UnSet,
  sortItem: SortTypes[0],
};


const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCurrentCity:
      return {
        ...state,
        city: action.payload,
        cardList: state.cardListAllCity.filter((cardOne) => cardOne.city.name === action.payload),
        isDataLoaded: true,
      };
    case ActionType.SortCardList:
      return {
        ...state,
        sortItem: action.payload,
        // cardList: sortCardList(action.payload, state.cardList),
      };
    case ActionType.LoadCityList:
      return {
        ...state,
        cardListAllCity: convertCityList(action.payload),
        cardList: convertCityList(action.payload).filter((cardOne) => cardOne.city.name === DEFAULT_CITY),
      };
    case ActionType.LoadOneCity:
      return {
        ...state,
        oneOffer: convertOneCity(action.payload),
        loadOneOfferError: false,
      };
    case ActionType.LoadNearby:
      return {
        ...state,
        nearbyOffers: convertCityList(action.payload),
      };
    case ActionType.LoadComments:
      return {
        ...state,
        comments: convertComments(action.payload),
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
    case ActionType.LoadOneOfferError:
      return {
        ...state,
        loadOneOfferError: true,
      };
    case ActionType.ChangeLoadCommentsStatus:
      return {
        ...state,
        isCommentPosted: action.payload,
      };
    default: return state;
  }
};

export {reducer};
