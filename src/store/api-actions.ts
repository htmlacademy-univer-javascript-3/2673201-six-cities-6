import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';
import {changeCity, setOffers, setLoadingStatus, setError} from './action';
import type {MainOffer, MainOffers} from '../types/main-offers';
import type { Review } from '../types/type-review';

type MainOfferFromServer = Omit<MainOffer, 'coordinates'> & {
  location: {
    latitude: number;
    longitude: number;
  };
};

type MainOffersFromServer = MainOfferFromServer[];


type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<void, undefined, ThunkConfig>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(true));
    dispatch(setError(null));
    try {
      const { data } = await api.get<MainOffersFromServer>(APIRoute.Offers);
      const adaptedOffers: MainOffers = data.map((offer) => ({
        ...offer,
        coordinates: [
          offer.location.latitude,
          offer.location.longitude,
        ],
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

export const fetchReviews = createAsyncThunk<Review[], string, ThunkConfig>(
  'reviews/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);
