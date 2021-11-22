import type {CardList} from '../../types/cardInfo';

export type CardListType = {
  cardInfo: CardList,
  onListItemHover?: (listItemName: number) => void,
}
