import {Review} from '../types/type-review.js';

export const reviews: Review[] = [
  {
    id: 1,
    offerId: 1,
    user: {
      name: 'Valera',
      avatarUrl: 'valera.jpg'
    },
    rating: 2.8,
    date: 'April 2024',
    text: 'Cool'
  },
  {
    id: 2,
    offerId: 1,
    user: {
      name: 'Kolya',
      avatarUrl: 'kolya.jpg'
    },
    rating: 4.4,
    date: 'September 2025',
    text: 'Not bad'
  },
  {
    id: 3,
    offerId: 2,
    user: {
      name: 'Artem',
      avatarUrl: 'artem.jpg'
    },
    rating: 3.5,
    date: 'February 2024',
    text: 'Well!'
  },
  {
    id: 4,
    offerId: 3,
    user: {
      name: 'Vlada',
      avatarUrl: 'vlada.jpg'
    },
    rating: 4.5,
    date: 'January 2025',
    text: 'Super, i like it'
  }
];
