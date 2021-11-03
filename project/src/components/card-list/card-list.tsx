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
    <>
      {cardInfo.map((oneCard) => (
        <Card
          key={`Card${oneCard.id}`}
          oneCard={oneCard}
          onMouseEnter = {() => onHover(oneCard.id)}
          onMouseLeave = {() => onHover(0)}
          data-id={activeCard}
        />
      ))}
    </>
  );
}

export default CardList;
