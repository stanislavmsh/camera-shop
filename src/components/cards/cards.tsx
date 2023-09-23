
import React from 'react';
import MemoizedCard from '../card/card';
import { useAppSelector } from '../../hooks';
import { getShownItems } from '../../store/cameras-data/cameras-data.selectors';

function Cards(): JSX.Element {

  const camerasList = useAppSelector(getShownItems);

  return(
    <div className="cards catalog__cards">
      {camerasList.map((elem) => <MemoizedCard classCustom='' key={elem.id} cameraInfo={elem}/>) }
    </div>
  );
}

const MemoizedCards = React.memo(Cards);

export default MemoizedCards;
