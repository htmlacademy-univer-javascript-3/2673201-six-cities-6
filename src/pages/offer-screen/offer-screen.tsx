import { useParams } from 'react-router-dom';
import { CITIES_LIST } from '../../const/cities';
import { useAppSelector } from '../../hooks';
import type { City } from '../../types/type-city';
import type { ExtendOffer } from '../../types/extend-offer.ts';
import HeaderOffer from './header-offer';
import OfferMain from './offer-main';
import OfferMap from './offer-map';
import NearPlaces from './near-places';

type RouteParams = { id: string };

function OfferScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();
  const offers = useAppSelector((state) => state.offers) as ExtendOffer[];
  const reviews = useAppSelector((state) => state.reviews);
  const offer = offers.find((item) => item.id === id);
  if (!offer) {
    return <div>Offer not found</div>;
  }
  const neighbors = offers.filter((off) => off.city === offer.city && off.id !== offer.id).slice(0, 3);
  const coords: [number, number][] = [offer, ...neighbors].map((off) => off.coordinates);
  const currentCity: City = CITIES_LIST.find((city) => city.name === offer.city) ?? CITIES_LIST[0];
  const activeCoord: [number, number] = offer.coordinates;
  return (
    <div className="page">
      <HeaderOffer />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferMain offer={offer} reviews={reviews} />
          <section className="offer__map map">
            <OfferMap
              city={currentCity}
              coords={coords}
              activeCoord={activeCoord}
            />
          </section>
        </section>
        <div className="container">
          <NearPlaces neighbors={neighbors} />
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
