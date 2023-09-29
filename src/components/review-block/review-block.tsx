import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentReviews } from '../../store/current-data/current-data.selectors';
import ReviewsList from '../reviews-list/reviews-list';
import { FOCUS_TIMEOUT } from '../../utils/const';
import ModalComponent from '../modal-component/modal-component';
import { setActiveStatus, setFormModalStatus } from '../../store/modal-process/modal-process.slice';

export default function ReviewBlock() : JSX.Element {
  const dispatch = useAppDispatch();
  const currentReviews = useAppSelector(getCurrentReviews);
  const [currentMax , setCurrentMax] = useState(3);
  const shownReviews = currentReviews.slice(0, currentMax);

  const handleLoadMore = () => {
    setCurrentMax(currentMax + 3);
  };

  const isDisabled = currentMax >= currentReviews.length;

  const handleOpenForm = () => {
    dispatch(setActiveStatus(true));
    dispatch(setFormModalStatus(true));

    setTimeout(() => {
      document.getElementById('name__input')?.focus();
    }, FOCUS_TIMEOUT);
    document.body.style.overflow = 'hidden';
  };


  return (

    <section data-testid='review-block-test' className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleOpenForm} className="btn" type="button">
                Оставить свой отзыв
          </button>
        </div>
        <ReviewsList reviews={shownReviews}/>
        <div className="review-block__buttons">
          <button onClick={handleLoadMore} className={`btn btn--purple ${isDisabled ? 'visually-hidden' : ''}`} type="button" disabled={isDisabled}>
                Показать больше отзывов
          </button>
        </div>
      </div>
      <ModalComponent />
    </section>
  );

}
