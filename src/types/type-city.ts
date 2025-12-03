import {CityType} from './type-offer.ts';

export type City = {
  id: number;
  name: CityType;
  latitude: number;
  longitude: number;
  zoom: number;
}
