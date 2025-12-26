import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import {MainOffers} from '../types/main-offers.ts';
import {CityType} from '../types/type-city.ts';
import {ExtendOffer} from "../types/extend-offer.ts";

export const changeCity = createAction<CityType>('city/change');
export const setOffers = createAction<MainOffers>('offers/setOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setLoadingStatus = createAction<boolean>('offers/setLoadingStatus');
export const setError = createAction<string | null>('offers/setError');
export const setCurrentOffer = createAction<ExtendOffer | null>('offer/setCurrentOffer');
