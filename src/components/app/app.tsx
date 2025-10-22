import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import NotFound from '../../pages/found-not-screen/found-not-screen.tsx';
import {Offer} from '../../types/type-offer.ts';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';

type AppScreenProps = {
  offerCardCount: number;
  offers: Offer[];
}

function App({offerCardCount, offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}
          element={<MainScreen offerCardCount={offerCardCount} offers={offers}/>}
        />
        <Route path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer}
          element={<OfferScreen offers={offers}/>}
        />
        <Route path={AppRoute.NotFound}
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
