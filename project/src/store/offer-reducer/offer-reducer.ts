import {ActionType, Actions} from '../../types/action';
import { OfferReducer } from '../../types/state';
import { LoadCommentsStatus } from '../../const';
import {convertCityList, convertOneCity, convertComments} from '../../services/adapter';


export const initialState: OfferReducer = {
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
  loadOneOfferError: false,
  isCommentPosted: LoadCommentsStatus.UnSet,
};


const offerReducer = (state = initialState, action: Actions): OfferReducer => {
  switch (action.type) {
    case ActionType.LoadOneCity:
      return {
        ...state,
        oneOffer: convertOneCity(action.payload),
        loadOneOfferError: false,
      };
    case ActionType.UpdateOneOffer:
      return {
        ...state,
        oneOffer: convertOneCity(action.payload),
      };
    case ActionType.LoadNearby:
      return {
        ...state,
        nearbyOffers: convertCityList(action.payload),
      };
    case ActionType.UpdateNearby:
      return {
        ...state,
        nearbyOffers: state.nearbyOffers.map((oneOffer) => {
          if (oneOffer.id === action.payload.id) {
            oneOffer.isFavorite = action.payload.isfavoritesStatus;
            return oneOffer;
          }
          return oneOffer;
        }),
      };
    case ActionType.LoadComments:
      return {
        ...state,
        comments: convertComments(action.payload),
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

export {offerReducer};
