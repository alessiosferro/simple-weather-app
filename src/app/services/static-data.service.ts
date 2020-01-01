import { Observable } from 'rxjs';
import { City } from './../models/city.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(private http: HttpClient) {}

  getCitiesByName(name: string): Observable<City[]> {
    const params = new HttpParams().append('q', name);
    const headers = new HttpHeaders().append('Static-Data-Request', 'cities');

    return this.http.get<City[]>('', { params, headers });
  }
}