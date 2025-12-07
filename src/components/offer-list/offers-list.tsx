import OfferCard from '../../pages/offer-card/offer-card.tsx';
import {MainOffer} from '../../types/main-offers.ts';

type OffersListProps = {
  offers: MainOffer[];
  onCardHover?: (offerId: string | null) => void;
}

function OffersList({ offers, onCardHover }: OffersListProps): JSX.Element {
  const handleMouseEnter = (offerId: string) => {
    onCardHover?.(offerId);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
        />
      ))}
    </div>
  );
}

export default OffersList;
