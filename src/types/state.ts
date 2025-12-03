import type {CityType, Offer} from './type-offer';
import {store} from '../store';

export type InitialState = {
  city: CityType;
  offers: Offer[];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
