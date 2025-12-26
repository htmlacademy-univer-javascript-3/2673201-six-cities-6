import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../../pages/found-not-screen/found-not-screen';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';
import {checkAuth, fetchOffers} from '../../store/api-actions.ts';
import Spinner from '../spinner/spinner.tsx';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuth());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen />}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
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
