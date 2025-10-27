import {Offer} from '../types/type-offer.js';

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful apartment',
    description: 'Cozy place in the city center, near all attractions',
    type: 'apartment',
    isPremium: true,
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 4,
    images: [
      'img123.jpg',
      'img154.jpg',
      'img316.jpg',
      'img434.jpg',
      'img587.jpg',
      'img623.jpg'
    ],
    host: {
      name: 'Kolya',
      isPro: false,
      avatarUrl: 'kolya.jpg'
    },
    price: 10,
    city: 'Paris'
  },
  {
    id: 2,
    images: [
      'img221.jpg',
      'img222.jpg',
      'img223.jpg',
      'img224.jpg',
      'img225.jpg',
      'img226.jpg'
    ],
    title: 'WoodPlace',
    description: 'Spectacular house for a family vacation.',
    type: 'house',
    isPremium: false,
    rating: 4.7,
    bedrooms: 4,
    maxAdults: 6,
    host: {
      name: 'Vlada',
      isPro: true,
      avatarUrl: 'vlada.jpg'
    },
    price: 12,
    city: 'Cologne'
  },
  {
    id: 3,
    images: [
      'img31.jpg',
      'img32.jpg',
      'img33.jpg',
      'img34.jpg',
      'img35.jpg',
      'img36.jpg'
    ],
    title: 'RoomView',
    description: 'Cozy studio with special atmosphere.',
    type: 'room',
    isPremium: false,
    rating: 4.2,
    bedrooms: 1,
    maxAdults: 2,
    host: {
      name: 'Dasha',
      isPro: false,
      avatarUrl: 'dasha.jpg'
    },
    price: 104,
    city: 'Amsterdam'
  },
  {
    id: 4,
    images: [
      'img1.jpg',
      'img2.jpg',
      'img3.jpg',
      'img4.jpg',
      'img5.jpg',
      'img6.jpg'
    ],
    title: 'Nice apartment',
    description: 'Comfortable place with modern decor.',
    type: 'house',
    isPremium: true,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 3,
    host: {
      name: 'Maomao',
      isPro: true,
      avatarUrl: 'maomao.jpg'
    },
    price: 108,
    city: 'Brussels'
  }
];
