import {useState} from 'react';
import Card from '../card/card';
import type {CardListType} from './type';

function CardList ({cardInfo, onListItemHover}: CardListType): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  const onHover = (activeId: number) => {
    setActiveCard(activeId);
    onListItemHover(activeId);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {cardInfo.map((oneCard) => (
        <Card
          key={oneCard.id}
          oneCard={oneCard}
          onMouseEnter = {() => onHover(oneCard.id)}
          onMouseLeave = {() => setActiveCard(0)}
          data-id={activeCard}
        />
      ))}
    </div>
  );
}

export default CardList;
