import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { AuthUserData } from '../../types/auth-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.user].isDataLoaded;
export const getAuthData = (state: State): AuthUserData => state[NameSpace.user].authData;
