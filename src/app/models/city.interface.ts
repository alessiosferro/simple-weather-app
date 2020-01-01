import { Coord } from './weather-api-response.interface';

export interface City {
  id: number;
  name: string;
  country: string;
  coord: Coord;
}