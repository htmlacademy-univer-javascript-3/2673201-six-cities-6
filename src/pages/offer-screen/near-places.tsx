import OfferCard from '../offer-card/offer-card';
import {MainOffer} from "../../types/main-offers.ts";

type Props = {
  neighbors: MainOffer[];
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
