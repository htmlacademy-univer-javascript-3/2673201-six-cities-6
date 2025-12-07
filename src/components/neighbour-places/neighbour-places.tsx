import OfferCard from '../../pages/offer-card/offer-card.tsx';
import {MainOffer} from '../../types/main-offers.ts';

type NeighbourPlacesProps = {
  offers: MainOffer[];
}

function NeighbourPlaces({offers}: NeighbourPlacesProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((off) => (
        <OfferCard key={off.id} offer={off} isNeighbour />
      ))}
    </div>
  );
}

export default NeighbourPlaces;
