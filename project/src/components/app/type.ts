import type {CardList} from '../../types/cardInfo';
import type {Reviews} from '../../types/reviews';

type AppProps = {
  numberOfPlaces: number,
  cardInfo: CardList,
  reviews: Reviews
}

export default AppProps;
