import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCurrentReviews } from '../../store/current-data/current-data.selectors';
import ReviewsList from '../reviews-list/reviews-list';
// import ReviewForm from '../review-form/review-form';
import ModalComment from '../modal-comment/modal-comment';

export default function ReviewBlock() : JSX.Element {
  const currentReviews = useAppSelector(getCurrentReviews);
  const [currentMax , setCurrentMax] = useState(3);
  const [isActive, setIsActive] = useState(false);

  const shownReviews = currentReviews.slice(0, currentMax);

  const handleLoadMore = () => {
    setCurrentMax(currentMax + 3);
  };

  const isDisabled = currentMax >= currentReviews.length;

  const handleOpenForm = () => {
    setIsActive(true);
  };

  const handleCloseForm = () => {
    setIsActive(false);
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
      <ModalComment handleCloseForm={handleCloseForm} isActive={isActive}/>
    </section>
  );

}
