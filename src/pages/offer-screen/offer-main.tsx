import { useCallback } from 'react';
import ReviewList from '../../components/review-list/review-list';
import { CommentSendReview } from '../../components/comment-send-review/comment-send-review';
import type { ExtendOffer } from '../../types/extend-offer';
import type { Review } from '../../types/type-review';
import { useAppDispatch } from '../../hooks';
import { toggleFavorite } from '../../store/api-actions';

type Props = {
  offer: ExtendOffer;
  reviews: Review[];
};

function OfferMain({ offer, reviews }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  let images: string[] = [];
  if (offer.images && offer.images.length > 0) {
    images = offer.images;
  } else if (offer.previewImage) {
    images = [offer.previewImage];
  }
  const goods = offer.goods ?? [];
  const hostName = offer.host?.name ?? 'Host';
  const hostAvatarUrl = offer.host?.avatarUrl ?? '';
  const hostIsPro = offer.host?.isPro ?? false;
  let avatarSrc = '/img/avatar-default.jpg';
  if (hostAvatarUrl) {
    if (hostAvatarUrl.startsWith('http') || hostAvatarUrl.startsWith('/')) {
      avatarSrc = hostAvatarUrl;
    } else {
      avatarSrc = `/${hostAvatarUrl}`;
    }
  }
  const bedrooms = offer.bedrooms ?? 0;
  const maxAdults = offer.maxAdults ?? 0;
  const description = offer.description ?? '';
  const handleBookmarkClick = useCallback(() => {
    void dispatch(
      toggleFavorite({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  }, [dispatch, offer.id, offer.isFavorite]);
  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.slice(0, 6).map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt={offer.title ?? 'Offer image'} />
            </div>
          ))}
        </div>
      </div>

      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}

          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer.title}</h1>
            <button
              className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
              type="button"
              onClick={handleBookmarkClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">
                {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          </div>

          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{offer.rating}</span>
          </div>

          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{offer.type ?? 'apartment'}</li>
            <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
            <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
          </ul>

          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>

          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            {goods.length > 0 ? (
              <ul className="offer__inside-list">
                {goods.map((item) => (
                  <li key={item} className="offer__inside-item">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="offer__inside-item">No facilities info</p>
            )}
          </div>

          <div className="offer__host">
            <div className="offer__host-user user">
              <div
                className={`offer__avatar-wrapper user__avatar-wrapper${
                  hostIsPro ? ' offer__avatar-wrapper--pro' : ''
                }`}
              >
                <img className="offer__avatar user__avatar" src={avatarSrc} width="74" height="74" alt={`${hostName} avatar`} />
              </div>
              <span className="offer__user-name">{hostName}</span>
              {hostIsPro && <span className="offer__user-status">Pro</span>}
            </div>

            <div className="offer__description">
              <p className="offer__text">{description}</p>
            </div>
          </div>

          <ReviewList reviews={reviews} />
          <CommentSendReview />
        </div>
      </div>
    </>
  );
}

export default OfferMain;
