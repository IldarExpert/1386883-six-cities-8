import {DEFAULT_CITY} from '../const';
import {ActionType, Actions} from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus } from '../const';
import {convertCityList} from '../services/adapter';


const initialState = {
  city: DEFAULT_CITY,
  cardList: [],
  cardListAllCity: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
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
    case ActionType.LoadCityList:
      return {
        ...state,
        cardListAllCity: convertCityList(action.payload),
        cardList: convertCityList(action.payload).filter((cardOne) => cardOne.city.name === DEFAULT_CITY),
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
    default: return state;
  }
};

export {reducer};
