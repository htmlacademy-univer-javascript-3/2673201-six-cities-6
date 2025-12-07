import OfferCard from '../offer-card/offer-card';
import type { ExtendOffer } from '../../types/extend-offer.ts';

type Props = {
  neighbors: ExtendOffer[];
};

function NearPlaces({ neighbors }: Props) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>

      <div className="near-places__list places__list">
        {neighbors.map((off) => (
          <OfferCard key={off.id} offer={off} isNeighbour />
        ))}
      </div>
    </section>
  );
}

export default NearPlaces;
