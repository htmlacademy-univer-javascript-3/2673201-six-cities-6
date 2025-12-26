import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CITIES_LIST } from '../../const/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { City } from '../../types/type-city';
import type { MainOffer } from '../../types/main-offers';
import HeaderOffer from './header-offer';
import OfferMain from './offer-main';
import OfferMap from './offer-map';
import NearPlaces from './near-places';
import Spinner from '../../components/spinner/spinner';
import { fetchOfferById, fetchReviews } from '../../store/api-actions';

type RouteParams = { id: string };

function OfferScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers) as MainOffer[];
  const reviews = useAppSelector((state) => state.reviews);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchOfferById(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);
  if (!id) {
    return <div>Offer not found</div>;
  }
  if (!currentOffer) {
    return <Spinner />;
  }
  const neighbors = offers.filter((off) => off.city === currentOffer.city && off.id !== currentOffer.id).slice(0, 3);
  const coords: [number, number][] = [currentOffer, ...neighbors].map((off) => off.coordinates);
  const currentCity: City = CITIES_LIST.find((city) => city.name === currentOffer.city) ?? CITIES_LIST[0];
  const activeCoord: [number, number] = currentOffer.coordinates;

  return (
    <div className="page">
      <HeaderOffer />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferMain offer={currentOffer} reviews={reviews} />
          <section className="offer__map map">
            <OfferMap city={currentCity} coords={coords} activeCoord={activeCoord} />
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
