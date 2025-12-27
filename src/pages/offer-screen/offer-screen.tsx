import {memo, useEffect} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CITIES_LIST } from '../../const/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferMain from './offer-main';
import OfferMap from './offer-map';
import NearPlaces from './near-places';
import Spinner from '../../components/spinner/spinner';
import { fetchNearbyOffers, fetchOfferById, fetchReviews } from '../../store/api-actions';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';

type RouteParams = { id: string };

function OfferScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews);
  useEffect(() => {
    if (!id) {
      navigate(AppRoute.NotFound);
      return;
    }
    void dispatch(fetchOfferById(id))
      .unwrap()
      .catch(() => navigate(AppRoute.NotFound));
    void dispatch(fetchNearbyOffers(id));
    void dispatch(fetchReviews(id));
  }, [dispatch, id, navigate]);
  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }
  if (!currentOffer) {
    return <Spinner />;
  }
  const near3 = nearbyOffers.slice(0, 3);
  const coords: [number, number][] = [currentOffer.coordinates, ...near3.map((o) => o.coordinates)];
  const currentCity = CITIES_LIST.find((c) => c.name === currentOffer.city) ?? CITIES_LIST[0];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferMain offer={currentOffer} reviews={reviews} />
          <section className="offer__map map">
            <OfferMap city={currentCity} coords={coords} activeCoord={currentOffer.coordinates} />
          </section>
        </section>
        <div className="container">
          <NearPlaces neighbors={nearbyOffers.slice(0, 3)} />
        </div>
      </main>
    </div>
  );
}

export default memo(OfferScreen);
