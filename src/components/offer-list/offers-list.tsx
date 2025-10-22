import { Offer } from '../../types/type-offer';
import OfferCard from '../../pages/offer-card/offer-card.tsx';

type OffersListProps = {
  offers: Offer[];
  onCardHover?: (offerId: number | null) => void;

}

function OffersList({ offers, onCardHover }: OffersListProps): JSX.Element {
  const handleMouseEnter = (offerId: number) => {
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
