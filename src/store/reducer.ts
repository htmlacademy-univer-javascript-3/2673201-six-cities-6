import { createReducer } from '@reduxjs/toolkit';
import {changeCity, requireAuthorization, setError, setLoadingStatus, setOffers,} from './action';
import type { InitialState } from '../types/state';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import {fetchNearbyOffers, fetchOfferById, fetchReviews, postComment,} from './api-actions';

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
    .addCase(fetchOfferById.pending, (state) => {
      state.currentOffer = null;
      state.error = null;
    })
    .addCase(fetchOfferById.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(fetchOfferById.rejected, (state, action) => {
      state.error = (action.payload as string) ?? 'FAILED_TO_LOAD_OFFER';
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchReviews.pending, (state) => {
      state.reviews = [];
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.reviews = [];
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
});
