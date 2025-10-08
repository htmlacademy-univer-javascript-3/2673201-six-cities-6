import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginScreen from "../../pages/login-screen/login-screen.tsx";
import FavoritesScreen from "../../pages/favorites-screen/favorites-screen.tsx";
import PropertyScreen from "../../pages/property-screen/property-screen.tsx";
import PrivateRoute from "../private-route/private-route.tsx";
import {AuthorizationStatus} from "../../const.ts";
import NotFound from "../../pages/found-not-screen/found-not-screen.tsx";

type AppScreenProps = {
  offerCardCount: number;
}

function App({ offerCardCount } : AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen offerCardCount={offerCardCount}/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route
          path="/favorites" element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<PropertyScreen/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
