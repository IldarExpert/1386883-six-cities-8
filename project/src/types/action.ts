export enum ActionType {
  ChangeCurrentCity = 'main/changeCurrentCity',
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCurrentCity,
  payload: string,
};

export type Actions = ChangeCurrentCityAction;
