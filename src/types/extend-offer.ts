import type { MainOffer } from './main-offers';

export type OfferRentType = 'apartment' | 'room' | 'house' | 'hotel';

export type Host = {
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type ExtendOffer = MainOffer & {
  description?: string;
  images?: string[];
  previewImage?: string;
  goods?: string[];
  type?: OfferRentType;
  bedrooms?: number;
  maxAdults?: number;
  host?: Host;
};
