import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { MainOffer } from '../../types/main-offers';
import { toggleFavorite } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type OfferCardProps = {
  offer: MainOffer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isNeighbour?: boolean;
};

function OfferCardComponent({offer, onMouseEnter, onMouseLeave, isNeighbour,}: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.(offer.id);
  }, [onMouseEnter, offer.id]);
  const handleMouseLeave = useCallback(() => {
    onMouseLeave?.();
  }, [onMouseLeave]);
  const handleBookmarkClick = useCallback(() => {
    void dispatch(
      toggleFavorite({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  }, [dispatch, offer.id, offer.isFavorite]);
  const baseClass = isNeighbour
    ? 'place-card near-places__card'
    : 'place-card cities__card';
  const imagesClass = isNeighbour
    ? 'place-card__image-wrapper near-places__image-wrapper'
    : 'place-card__image-wrapper cities__image-wrapper';
  const ratingWidth = `${(offer.rating / 5) * 100}%`;

  return (
    <article
      className={baseClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imagesClass}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCardComponent);
