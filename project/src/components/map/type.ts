import type {CardList, City, CardOne} from '../../types/cardInfo';

type MapProps = {
  city: City,
  cardInfo: CardList,
  selectedPoint: CardOne | undefined,
  classIn: string
  styleIn: {
    height: string,
    minHeight: string,
  }
}

export default MapProps;
