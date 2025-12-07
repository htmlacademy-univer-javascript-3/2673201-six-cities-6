import {City} from '../types/type-city.js';

export const PARIS: City = {
  id: 0,
  name: 'Paris',
  latitude: 48.8534,
  longitude: 2.3488,
  zoom: 12,
};

export const AMSTERDAM: City = {
  id: 1,
  name: 'Amsterdam',
  latitude: 52.378,
  longitude: 4.89,
  zoom: 12,
};

export const CITIES_LIST: City[] = [PARIS, AMSTERDAM, ];
