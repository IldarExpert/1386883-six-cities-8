import {ActionType, Actions} from '../../types/action';
import { FavoritesReducer } from '../../types/state';
import {convertCityList, convertOneCity} from '../../services/adapter';

const initialState: FavoritesReducer = {
  favoritesCardList: [],
};

const favoritesReducer = (state = initialState, action: Actions): FavoritesReducer => {
  switch (action.type) {
    case ActionType.LoadFavorites:
      return {
        ...state,
        favoritesCardList: convertCityList(action.payload),
      };
    case ActionType.UpdateFavorites:
      return {
        ...state,
        favoritesCardList: state.favoritesCardList.map((oneCard) => {
          if (oneCard.id !== action.payload.id) {
            return oneCard;
          }
          return convertOneCity(action.payload);
        }),
      };
    default: return state;
  }
};

export {favoritesReducer};
