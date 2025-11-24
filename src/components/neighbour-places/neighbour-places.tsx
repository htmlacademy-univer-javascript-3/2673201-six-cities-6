import {Offer} from '../../types/type-offer.ts';
import OfferCard from '../../pages/offer-card/offer-card.tsx';

type NeighbourPlacesProps = {
  offers: Offer[];
}

function NeighbourPlacesList({offers}: NeighbourPlacesProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((off) => (
        <OfferCard key={off.id} offer={off} isNeighbour />
      ))}
    </div>
  );
}

export default NeighbourPlacesList;
