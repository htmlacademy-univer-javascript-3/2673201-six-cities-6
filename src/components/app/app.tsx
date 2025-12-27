import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFound from '../../pages/found-not-screen/found-not-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import { checkAuth, fetchOffers } from '../../store/api-actions';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  useEffect(() => {
    void dispatch(fetchOffers());
    void dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isOffersLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
            <MainScreen/>
          }
          />
          <Route
            path={AppRoute.Login}
            element={
            <LoginScreen/>
          }
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
            element={
            <OfferScreen/>
          }
          />
          <Route
            path={AppRoute.NotFound}
            element={
            <NotFound />
          }
          />
          <Route
            path="*"
            element={
            <Navigate to={AppRoute.NotFound} replace
            />
          }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
