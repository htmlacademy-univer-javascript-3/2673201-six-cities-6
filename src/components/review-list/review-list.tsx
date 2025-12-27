import type { Review } from '../../types/type-review';
import ReviewDisplay from '../review/review';
import {memo, useMemo} from 'react';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const shownReviews = useMemo(() => reviews.slice(0, 10), [reviews]);
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

export default memo(ReviewList);
