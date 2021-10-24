export enum ActionType {
  ChangeCurrentCity = 'main/changeCurrentCity',
  // GetCurrentCityCardList = 'main/getCurrentCityCardList'
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCurrentCity,
  payload: string,
};

export type Actions = ChangeCurrentCityAction;
