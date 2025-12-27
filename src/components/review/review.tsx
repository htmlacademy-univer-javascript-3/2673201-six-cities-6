import type { Review } from '../../types/type-review';
import {memo} from 'react';

type ReviewProps = {
  review: Review;
};

function ReviewDisplay({ review }: ReviewProps): JSX.Element {
  const ratingWidth = `${(review.rating / 5) * 100}%`;
  const avatarUrl = review.user.avatarUrl ?? '';
  let avatarSrc = '';
  if (avatarUrl.startsWith('http')) {
    avatarSrc = avatarUrl;
  } else if (avatarUrl.startsWith('/')) {
    avatarSrc = avatarUrl;
  } else if (avatarUrl) {
    avatarSrc = `/${avatarUrl}`;
  } else {
    avatarSrc = '/img/avatar.svg';
  }
  const dateObj = new Date(review.date);
  const isValidDate = !Number.isNaN(dateObj.getTime());
  const formattedDate = isValidDate
    ? dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : review.date;
  const dateTime = isValidDate ? dateObj.toISOString() : review.date;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarSrc} width="54" height="54" alt={`${review.user.name} avatar`}
            onError={(e) => {
              e.currentTarget.src = '/img/avatar.svg';
            }}
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={dateTime}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default memo(ReviewDisplay);
