import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { CityType } from './type-city';
import { MainOffers } from './main-offers';
import { Review } from './type-review';
import { ExtendOffer } from './extend-offer';

export type UserData = {
  email: string;
};

export type InitialState = {
  city: CityType;
  offers: MainOffers;
  currentOffer: ExtendOffer | null;
  nearbyOffers: MainOffers;
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  isOffersLoading: boolean;
  error: string | null;
  favorites: MainOffers;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
