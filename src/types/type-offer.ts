export type Offer = {
  id: number;
  images: string[];
  title: string;
  description: string;
  isPremium: boolean;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  host: {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
};
