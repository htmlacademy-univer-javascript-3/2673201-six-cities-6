import {CityType} from './type-offer.ts';

export type City = {
  name: CityType;
  latitude: number;
  longitude: number;
  zoom: number;
}
