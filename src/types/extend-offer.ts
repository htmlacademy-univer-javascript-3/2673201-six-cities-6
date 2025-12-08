import {MainOffer} from './main-offers.ts';

export type OfferRentType = 'apartment' | 'room' | 'house' | 'hotel';

export type ExtendOffer = MainOffer & {
  images?: string[];
  previewImage?: string;
  description?: string;
  type: OfferRentType;
  bedrooms?: number;
  maxAdults: number;
  host?: {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
};
