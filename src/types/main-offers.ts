import type { CityType } from './type-city';

export type MainOffer = {
  id: string;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  city: CityType;
  coordinates: [number, number];
};

export type MainOffers = MainOffer[];
