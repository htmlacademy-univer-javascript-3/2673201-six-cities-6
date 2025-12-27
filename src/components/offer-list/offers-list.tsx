import { memo, useCallback } from 'react';
import OfferCard from '../../pages/offer-card/offer-card';
import type { MainOffer } from '../../types/main-offers';

type OffersListProps = {
  offers: MainOffer[];
  onCardHover?: (offerId: string | null) => void;
};

function OffersListComponent({ offers, onCardHover }: OffersListProps): JSX.Element {
  const handleEnter = useCallback(
    (id: string) => {
      onCardHover?.(id);
    },
    [onCardHover]
  );
  const handleLeave = useCallback(() => {
    onCardHover?.(null);
  }, [onCardHover]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        />
      ))}
    </div>
  );
}

export default memo(OffersListComponent);
