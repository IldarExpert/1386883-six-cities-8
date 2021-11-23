import {DEFAULT_CITY} from '../../const';
import {ActionType, Actions} from '../../types/action';
import { OfferListReduser } from '../../types/state';
import { SortTypes } from '../../const';
import {convertCityList} from '../../services/adapter';


const initialState: OfferListReduser = {
  city: DEFAULT_CITY,
  cardList: [],
  cardListAllCity: [],
  isDataLoaded: false,
  sortItem: SortTypes[0],
};


const offerListReduser = (state = initialState, action: Actions): OfferListReduser => {
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
      };
    case ActionType.LoadCityList:
      return {
        ...state,
        cardListAllCity: convertCityList(action.payload),
        cardList: convertCityList(action.payload).filter((cardOne) => cardOne.city.name === DEFAULT_CITY),
      };
    default: return state;
  }
};

export {offerListReduser};
