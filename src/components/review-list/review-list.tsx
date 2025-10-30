import {Review} from '../../types/type-review.ts';
import ReviewDisplay from '../review/review.tsx';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewDisplay key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewList;
