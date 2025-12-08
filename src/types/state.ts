import { store } from '../store';
import { AuthorizationStatus } from '../const';
import {CityType} from './type-city.ts';
import {MainOffers} from './main-offers.ts';
import {Review} from './type-review.ts';
import {ExtendOffer} from './extend-offer.ts';

export type InitialState = {
  city: CityType;
  offers: MainOffers;
  currentOffer: ExtendOffer | null;
  nearbyOffers: MainOffers;
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  isOffersLoading: boolean;
  error: string | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
