import type { Review } from '../../types/type-review';
import ReviewDisplay from '../review/review';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const shownReviews = reviews.slice(0, 10);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {shownReviews.map((review) => (
          <ReviewDisplay key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewList;
