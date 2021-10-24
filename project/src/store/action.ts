import {ActionType, Actions} from '../types/action';

export const changeCity = (city: string): Actions => ({
  type: ActionType.ChangeCurrentCity,
  payload: city,
});
