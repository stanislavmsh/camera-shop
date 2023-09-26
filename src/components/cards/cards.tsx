
import React from 'react';
import MemoizedCard from '../card/card';
import { useAppSelector } from '../../hooks';
import { getShownItems } from '../../store/cameras-data/cameras-data.selectors';

function Cards(): JSX.Element {

  const camerasList = useAppSelector(getShownItems);

  return(
    <div data-testid='cards-test' className="cards catalog__cards">
      {camerasList.map((elem) => <MemoizedCard classCustom='' key={`${elem.id}${elem.price}`} cameraInfo={elem}/>) }
    </div>
  );
}

const MemoizedCards = React.memo(Cards);

export default MemoizedCards;
