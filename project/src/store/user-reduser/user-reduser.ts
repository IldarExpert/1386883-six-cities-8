import {ActionType, Actions} from '../../types/action';
import { UserReduser } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { convertAuthData } from '../../services/adapter';

const initialState: UserReduser = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  authData: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
};

const userReduser = (state = initialState, action: Actions): UserReduser => {
  switch (action.type) {
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
    case ActionType.SaveAuthData:
      return {
        ...state,
        authData: convertAuthData(action.payload),
      };
    default: return state;
  }
};

export {userReduser};
