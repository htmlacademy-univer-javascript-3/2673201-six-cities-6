export type CityType = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type City = {
  id: number;
  name: CityType;
  latitude: number;
  longitude: number;
  zoom: number;
}
