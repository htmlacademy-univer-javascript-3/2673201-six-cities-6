import {Offer} from '../../types/type-offer.ts';
import OffersList from '../../components/offer-list/offers-list.tsx';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {City} from '../../types/type-city.ts';
import {useSelector} from 'react-redux';
import {State} from '../../types/state.ts';
import {CITIES_LIST} from '../../mocks/cities.ts';
import {SortType} from '../../const.ts';
import SortOperations from '../../components/sort-operations/sort-operations.tsx';

type MainScreenProps = {
  offerCardCount: number;
  offers: Offer[];
}

function MainScreen({offerCardCount, offers}: MainScreenProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const handleCardHover = (offerId: number | null) => {
    setActiveOfferId(offerId);
  };
  const cityName = useSelector((state: State) => state.city);
  const currentCity: City = CITIES_LIST.find((city) => city.name === cityName) ?? CITIES_LIST[0];
  const sortOffers = (offersList: Offer[], sortType: SortType): Offer[] => {
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return [...offersList].sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return [...offersList].sort((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return [...offersList].sort((a, b) => b.rating - a.rating);
      default:
        return offersList;
    }
  };

  const sortedOffers = sortOffers(offers, activeSort);
  const coords: [number, number][] = sortedOffers.map((off) => off.coordinates);
  const activeCoord: [number, number] | null = sortedOffers.find((off) => off.id === activeOfferId)?.coordinates ?? null;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"/>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES_LIST}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offerCardCount} places to stay in {cityName}
              </b>
              <SortOperations
                activeSort={activeSort}
                onSortChange={setActiveSort}
              />
              <OffersList
                offers={sortedOffers}
                onCardHover={handleCardHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} coords={coords} activeCoord={activeCoord}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
