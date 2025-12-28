import OffersList from '../../components/offer-list/offers-list';
import { useCallback, useMemo, useState } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { City } from '../../types/type-city';
import { SortType } from '../../const';
import SortOperations from '../../components/sort-operations/sort-operations';
import { CITIES_LIST } from '../../const/cities';
import { useAppSelector } from '../../hooks';
import { MainOffer } from '../../types/main-offers.ts';
import Header from '../../components/header/header.tsx';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen.tsx';


function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers) as MainOffer[];
  const handleCardHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);
  const currentCity = useMemo<City>(
    () => CITIES_LIST.find((c) => c.name === city) ?? CITIES_LIST[0],
    [city]
  );
  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city === city),
    [offers, city]
  );
  const hasOffers = cityOffers.length > 0;
  const sortedOffers = useMemo(() => {
    if (!hasOffers) {
      return [];
    }
    switch (activeSort) {
      case SortType.PriceLowToHigh:
        return [...cityOffers].sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return [...cityOffers].sort((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return [...cityOffers].sort((a, b) => b.rating - a.rating);
      default:
        return cityOffers;
    }
  }, [cityOffers, activeSort, hasOffers]);
  const coords = useMemo<[number, number][]>(
    () => sortedOffers.map((off) => off.coordinates),
    [sortedOffers]
  );
  const activeCoord = useMemo<[number, number] | null>(() => {
    const activeOffer = sortedOffers.find((off) => off.id === activeOfferId);
    return activeOffer ? activeOffer.coordinates : null;
  }, [sortedOffers, activeOfferId]);
  if (!hasOffers) {
    return <MainEmptyScreen />;
  }
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES_LIST} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} places to stay in {currentCity.name}
              </b>
              <SortOperations activeSort={activeSort} onSortChange={setActiveSort} />
              <OffersList offers={sortedOffers} onCardHover={handleCardHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} coords={coords} activeCoord={activeCoord} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
