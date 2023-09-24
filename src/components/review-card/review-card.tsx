import { TReview } from '../../types/review';
import { STARS_RATING } from '../../utils/const';

type TReviewCardProps = {
  reviewInfo : TReview;
}

export default function ReviewCard({reviewInfo} : TReviewCardProps) {

  const humanizedDate = new Date(reviewInfo.createAt).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long'
  });

  const htmlDate = new Date(reviewInfo.createAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  return(
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{reviewInfo.userName}</p>
        <time className="review-card__data" dateTime={htmlDate}>
          {humanizedDate}
        </time>
      </div>
      <div className="rate review-card__rate">
        {STARS_RATING.map((elem) =>
          (
            <svg key={elem} width={17} height={16} aria-hidden="true">
              <use xlinkHref={elem <= reviewInfo.rating ? '#icon-full-star' : '#icon-star'} />
            </svg>
          ))}
        <p className="visually-hidden">Оценка: {reviewInfo.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {reviewInfo.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {reviewInfo.disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {reviewInfo.review}
          </p>
        </li>
      </ul>
    </li>
  );

}
