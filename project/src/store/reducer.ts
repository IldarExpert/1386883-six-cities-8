import {cardInfo} from  '../mocks/offers';
import {DEFAULT_CITY} from '../const';
import {ActionType, Actions} from '../types/action';
import { State } from '../types/state';


const initialState = {
  city: DEFAULT_CITY,
  cardList: cardInfo.filter((cardOne) => cardOne.city.name === DEFAULT_CITY),
};


const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCurrentCity:
      return {...state, city: action.payload, cardList: cardInfo.filter((cardOne) => cardOne.city.name === action.payload)};

    default: return state;
  }
};

export {reducer};
