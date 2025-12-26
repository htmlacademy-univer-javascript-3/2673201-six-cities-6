import { createReducer } from '@reduxjs/toolkit';
import {changeCity, requireAuthorization, setCurrentOffer, setError, setLoadingStatus, setOffers,} from './action';
import type { InitialState } from '../types/state';
import {AuthorizationStatus, DEFAULT_CITY} from '../const';
import {fetchOfferById, fetchReviews} from './api-actions.ts';

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersLoading: true,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(fetchReviews.fulfilled, (state, { payload }) => {
      state.reviews = payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(fetchOfferById.fulfilled, (state, { payload }) => {
      state.currentOffer = payload;
    });
});
