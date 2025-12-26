import {CityType} from "./types/type-city.js";

export enum AppRoute {
  Login = '/login',
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CITIES {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const DEFAULT_CITY: CityType = 'Paris';
