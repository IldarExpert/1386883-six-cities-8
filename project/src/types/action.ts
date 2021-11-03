import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import { State } from '../types/state';
import {
  changeCity,
  loadCityList,
  requireAuthorization,
  requireLogout
} from '../store/action';

export enum ActionType {
  ChangeCurrentCity = 'main/changeCurrentCity',
  LoadCityList = 'data/loadCityList',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

// export type ChangeCurrentCityAction = {
//   type: ActionType.ChangeCurrentCity,
//   payload: string,
// };

export type Actions =
| ReturnType<typeof changeCity>
| ReturnType<typeof loadCityList>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>;
// | ChangeCurrentCityAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
