import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/api-actions';
import {AuthorizationStatus, MAX_LEN, MIN_LEN} from '../../const.ts';

type RouteParams = { id: string };

type FormState = {
  rating: number;
  comment: string;
};

const initialState: FormState = { rating: 0, comment: '' };

export function CommentSendReview(): JSX.Element | null {
  const { id } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  if (authStatus !== AuthorizationStatus.Auth) {
    return null;
  }
  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rating: Number(evt.target.value),
    }));
  };
  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      comment: evt.target.value,
    }));
  };
  const trimmedComment = formData.comment.trim();
  const commentLength = trimmedComment.length;
  const isSubmitDisabled = isSubmitting ||
    formData.rating === 0 ||
    commentLength < MIN_LEN ||
    commentLength > MAX_LEN;
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitError(null);
    if (!id || isSubmitDisabled) {
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(
        postComment({ offerId: id, comment: trimmedComment, rating: formData.rating })
      ).unwrap();
      setFormData(initialState);
    } catch {
      setSubmitError('Не удалось отправить отзыв. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="comment">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleRatingChange} checked={formData.rating === 5} disabled={isSubmitting}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleRatingChange} checked={formData.rating === 4} disabled={isSubmitting}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleRatingChange} checked={formData.rating === 3} disabled={isSubmitting}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleRatingChange} checked={formData.rating === 2} disabled={isSubmitting}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleRatingChange} checked={formData.rating === 1} disabled={isSubmitting}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleCommentChange} value={formData.comment} disabled={isSubmitting}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span
            className="reviews__star">rating
          </span> and describe your stay
          with at least
          <b className="reviews__text-amount">{MIN_LEN} characters</b>
          and no more than{' '}
          <b className="reviews__text-amount">{MAX_LEN} characters</b>.
        </p>
        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
