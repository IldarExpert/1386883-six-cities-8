import {useState} from 'react';
import Card from '../card/card';
import type {CardListType} from './type';

function CardList ({cardInfo}: CardListType): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="cities__places-list places__list tabs__content">
      {cardInfo.map((oneCard) => (
        <Card
          key={oneCard.id}
          oneCard={oneCard}
          onMouseEnter = {() => setActiveCard(oneCard.id)}
          onMouseLeave = {() => setActiveCard(0)}
          activeId={activeCard}
        />
      ))}
    </div>
  );
}

export default CardList;
