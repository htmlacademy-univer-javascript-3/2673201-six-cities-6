import { Link } from 'react-router-dom';
import {MainOffer} from '../../types/main-offers.ts';

type OfferCardProps = {
  offer: MainOffer;
  onMouseEnter?: (id: string) => void;
  isNeighbour?: boolean;
}

function OfferCard({ offer, onMouseEnter, isNeighbour }: OfferCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter?.(offer.id);
  };

  const baseClass = `place-card ${isNeighbour
    ? 'near-places__card'
    : 'cities__card'}`;
  const imagesClass = `place-card__image-wrapper ${isNeighbour
    ? 'near-places__image-wrapper'
    : 'cities__image-wrapper'}`;

  return (
    <article
      className={baseClass}
      onMouseEnter={handleMouseEnter}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imagesClass}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
