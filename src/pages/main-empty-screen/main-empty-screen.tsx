import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import { CITIES_LIST } from '../../const/cities';

function MainEmptyScreen(): JSX.Element {
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
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <div className="cities__status-wrapper">
                <b className="cities__status">
                  No places to stay available
                </b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in your chosen city
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmptyScreen;
