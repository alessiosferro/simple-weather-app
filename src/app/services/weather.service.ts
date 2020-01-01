import { WeatherAPIResponse } from '../models/weather-api-response.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { WeatherAPI } from '../data/weather-api-paths';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherByLocationName(locationName: string): Observable<WeatherAPIResponse> {
    const params = new HttpParams().append('q', locationName);
    const headers = new HttpHeaders().append('Weather-Request', WeatherAPI.OneLocation);

    return this.http.get<WeatherAPIResponse>('', { params, headers });
  }

  getWeatherByLocationNameAndCountryCode(locationName: string, countryCode: string): Observable<WeatherAPIResponse> {
    const params = new HttpParams().append('q', `${locationName},${countryCode}`);
    const headers = new HttpHeaders().append('Weather-Request', WeatherAPI.OneLocation);

    return this.http.get<WeatherAPIResponse>('', { params, headers });
  }

  getWeatherByLocationId(locationId: number): Observable<WeatherAPIResponse> {
    const params = new HttpParams().append('id', locationId.toString());
    const headers = new HttpHeaders().append('Weather-Request', WeatherAPI.OneLocation);

    return this.http.get<WeatherAPIResponse>('', { params, headers })
  }
}