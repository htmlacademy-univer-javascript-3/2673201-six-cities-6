import OfferCard from '../offer-card/offer-card';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import type { MainOffer } from '../../types/main-offers';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers) as MainOffer[];
  const favoriteOffers = offers.filter((o) => o.isFavorite);
  const groupedByCity = favoriteOffers.reduce<Record<string, MainOffer[]>>(
    (acc, offer) => {
      (acc[offer.city] ??= []).push(offer);
      return acc;
    },
    {}
  );
  const cities = Object.keys(groupedByCity);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favoriteOffers.length === 0 ? (
              <p>Nothing yet saved</p>
            ) : (
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <span className="locations__item-link">
                          <span>{city}</span>
                        </span>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedByCity[city].map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
