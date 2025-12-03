import MainScreen from '../../pages/main-screen/main-screen.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import NotFound from '../../pages/found-not-screen/found-not-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import { useSelector } from 'react-redux';
import type { State } from '../../types/state';

function App(): JSX.Element {
  const city = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);
  const filterOffers = offers.filter((offer) => offer.city === city);
  const offerCardCount = filterOffers.length;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen
              offerCardCount={offerCardCount}
              offers={filterOffers}
            />
          }
        />

        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element={<OfferScreen offers={offers} />}
        />

        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
