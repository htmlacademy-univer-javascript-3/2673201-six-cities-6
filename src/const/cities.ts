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

export const COLOGNE: City = {
  id: 2,
  name: 'Cologne',
  latitude: 50.938361,
  longitude: 6.959974,
  zoom: 12,
};

export const BRUSSELS: City = {
  id: 3,
  name: 'Brussels',
  latitude: 50.847,
  longitude: 4.351697,
  zoom: 12,
};

export const HAMBURG: City = {
  id: 4,
  name: 'Hamburg',
  latitude: 53.550341,
  longitude: 10.000654,
  zoom: 12,
};

export const DUSSELDOLF: City = {
  id: 5,
  name: 'Dusseldorf',
  latitude: 51.225402,
  longitude: 6.776314,
  zoom: 12,
};

export const CITIES_LIST: City[] = [PARIS, AMSTERDAM, COLOGNE, BRUSSELS, HAMBURG, DUSSELDOLF];
