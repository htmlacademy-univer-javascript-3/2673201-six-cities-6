import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '../types/state';
import {APIRoute, AuthorizationStatus} from '../const';
import {changeCity, setOffers, setLoadingStatus, setError, requireAuthorization, setUser, logout} from './action';
import type {MainOffer, MainOffers} from '../types/main-offers';
import type { Review } from '../types/type-review';
import {CityType} from '../types/type-city.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {ExtendOffer} from '../types/extend-offer.ts';

type MainOfferFromServer = Omit<MainOffer, 'coordinates'> & {
  city: { name: CityType };
  location: {
    latitude: number;
    longitude: number;
  };
};

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

type AuthData = {
  email: string;
  password: string;
};

type AuthInfo = {
  token: string;
};

type OfferFromServer = Omit<ExtendOffer, 'coordinates' | 'city'> & {
  city: { name: CityType };
  location: { latitude: number; longitude: number };
};

type ReviewFromServer = Omit<Review, 'text'> & {
  comment: string;
};

type OfferShortFromServer = Omit<MainOffer, 'coordinates'> & {
  city: { name: CityType };
  location: { latitude: number; longitude: number };
};


type MainOffersFromServer = MainOfferFromServer[];

export const login = createAsyncThunk<void, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthInfo>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUser({ email }));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { dispatch }) => {
    await Promise.resolve();
    dropToken();
    dispatch(logout());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const fetchOffers = createAsyncThunk<void, undefined, ThunkConfig>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(true));
    dispatch(setError(null));
    try {
      const { data } = await api.get<MainOffersFromServer>(APIRoute.Offers);
      const adaptedOffers: MainOffers = data.map((offer) => ({
        ...offer,
        city: offer.city.name,
        coordinates: [offer.location.latitude, offer.location.longitude],
      }));
      dispatch(setOffers(adaptedOffers));
      if (adaptedOffers.length > 0) {
        dispatch(changeCity(adaptedOffers[0].city));
      }
    } catch (error) {
      dispatch(setError('Не удалось загрузить офферы'));
    } finally {
      dispatch(setLoadingStatus(false));
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], string, ThunkConfig>(
  'reviews/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewFromServer[]>(`${APIRoute.Comments}/${offerId}`);
    const adapted: Review[] = data.map((r) => ({
      ...r,
      text: r.comment,
    }));
    return adapted;
  }
);

export const fetchOfferById = createAsyncThunk<ExtendOffer, string, ThunkConfig>(
  'offer/fetchById',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferFromServer>(`${APIRoute.Offers}/${offerId}`);
      return {
        ...data,
        city: data.city.name,
        coordinates: [data.location.latitude, data.location.longitude],
      };
    } catch {
      return rejectWithValue('NOT_FOUND');
    }
  }
);

export const postComment = createAsyncThunk<Review[], { offerId: string; comment: string; rating: number }, ThunkConfig>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<ReviewFromServer[]>(
      `${APIRoute.Comments}/${offerId}`,
      { comment, rating }
    );
    return data.map((r) => ({
      ...r,
      text: r.comment,
    }));
  }
);


export const fetchNearbyOffers = createAsyncThunk<MainOffers, string, ThunkConfig>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferShortFromServer[]>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );
    return data.map((offer) => ({
      ...offer,
      city: offer.city.name,
      coordinates: [offer.location.latitude, offer.location.longitude],
    }));
  }
);

export const fetchFavorites = createAsyncThunk<MainOffers, undefined, ThunkConfig>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<MainOffersFromServer>(APIRoute.Favorites);
    return data.map((offer) => ({
      ...offer,
      city: offer.city.name,
      coordinates: [offer.location.latitude, offer.location.longitude],
    }));
  }
);

export const toggleFavorite = createAsyncThunk<MainOffer, { offerId: string; status: 0 | 1 }, ThunkConfig>(
  'favorite/toggle',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<MainOfferFromServer>(
      `/favorite/${offerId}/${status}`
    );
    return {
      ...data,
      city: data.city.name,
      coordinates: [data.location.latitude, data.location.longitude],
    };
  }
);
