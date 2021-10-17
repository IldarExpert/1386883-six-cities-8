import type {CardList, City, CardOne} from '../../types/cardInfo';

type MapProps = {
  city: City,
  cardInfo: CardList,
  selectedPoint: CardOne | undefined,
}

export default MapProps;
