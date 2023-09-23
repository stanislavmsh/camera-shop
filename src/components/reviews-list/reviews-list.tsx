import { TReview } from '../../types/review';
import ReviewCard from '../review-card/review-card';

type TReviewsListProps = {
  reviews: TReview[];
}


export default function ReviewsList({reviews} : TReviewsListProps): JSX.Element {


  return (
    <ul className="review-block__list">
      {reviews.map((elem) => <ReviewCard key={elem.id} reviewInfo={elem}/>)}
    </ul>
  );
}
