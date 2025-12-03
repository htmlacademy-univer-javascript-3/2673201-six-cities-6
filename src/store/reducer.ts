import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers } from './action';
import type { InitialState } from '../types/state';
import { offers } from '../mocks/offers';
import {CITIES} from "../const.ts";

const initialState: InitialState = {
  city: CITIES.Paris,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state, { payload }) => {
      state.offers = payload;
    });
});
