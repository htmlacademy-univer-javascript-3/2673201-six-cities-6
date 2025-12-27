import { createReducer } from '@reduxjs/toolkit';
import {changeCity, logout, requireAuthorization, setError, setLoadingStatus, setOffers, setUser,} from './action';
import type { InitialState } from '../types/state';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import {fetchFavorites, fetchNearbyOffers, fetchOfferById, fetchReviews, postComment, toggleFavorite,} from './api-actions';

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isOffersLoading: true,
  error: null,
  favorites: [],
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
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      const updated = action.payload;
      const { id, isFavorite } = updated;
      state.offers = state.offers.map((o) =>
        o.id === id ? { ...o, isFavorite } : o
      );
      if (state.currentOffer && state.currentOffer.id === id) {
        state.currentOffer.isFavorite = isFavorite;
      }
      state.nearbyOffers = state.nearbyOffers.map((o) =>
        o.id === id ? { ...o, isFavorite } : o
      );
      if (isFavorite) {
        const exists = state.favorites.some((o) => o.id === id);
        if (!exists) {
          state.favorites = [updated, ...state.favorites];
        }
      } else {
        state.favorites = state.favorites.filter((o) => o.id !== id);
      }
    });
});
