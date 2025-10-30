export type CityType = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'

export type OfferRentType = 'apartment' | 'room' | 'house' | 'hotel';

export type Offer = {
  id: number;
  images: string[];
  title: string;
  description: string;
  isPremium: boolean;
  type: OfferRentType;
  price: number;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  host: {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  city: CityType;
  coordinates: [latitude: number, longtitude: number];
};
