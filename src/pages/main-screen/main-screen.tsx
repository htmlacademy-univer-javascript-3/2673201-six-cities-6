import OffersList from '../../components/offer-list/offers-list';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import {City} from '../../types/type-city';
import {SortType} from '../../const';
import SortOperations from '../../components/sort-operations/sort-operations';
import {CITIES_LIST} from '../../const/cities';
import {useAppSelector} from '../../hooks';
import {MainOffer} from '../../types/main-offers.ts';

function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers) as MainOffer[];
  const offerCardCount = offers.length;
  const handleCardHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };
  const currentCity: City = CITIES_LIST.find((c) => c.name === city) ?? CITIES_LIST[0];
  const sortOffers = (
    offersList: MainOffer[],
    sortType: SortType
  ): MainOffer[] => {
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
  const activeOffer = sortedOffers.find((off) => off.id === activeOfferId);
  const activeCoord: [number, number] | null = activeOffer ? activeOffer.coordinates : null;
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
                {offerCardCount} places to stay in {currentCity.name}
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
