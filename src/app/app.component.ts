import { LoadingService } from './services/loading.service';
import { City } from './models/city.interface';
import { StaticDataService } from "./services/static-data.service";
import { WeatherService } from "./services/weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  distinctUntilChanged,
  debounceTime,
  takeUntil,
  switchMap,
  filter,
  map,
  tap
} from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EventEmitter } from 'protractor';
import { WeatherAPIResponse } from './models/weather-api-response.interface';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  city: FormGroup;
  unsubscribe$: Subject<void>;
  countries$: Observable<any>;
  submitted$ = new Subject();
  getWeather$ = new Subject<number>();
  weather$ = new Observable<WeatherAPIResponse>();

  constructor(
    public loadingService: LoadingService,
    private weatherService: WeatherService,
    private staticDataService: StaticDataService,
  ) {}

  ngOnInit() {
    this.city = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.unsubscribe$ = new Subject<void>();

    this.countries$ = this.city.get('name').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      filter(() => this.city.valid),
      switchMap(name => this.staticDataService.getCitiesByName(name)),
      map(cities => {
        let countryCities = {};
        
        for(const city of cities) {
          let property = `${city.country}_cities`;

          if(!countryCities[property]) {
            countryCities[property] = {
              code: city.country,
              cities: [city]
            }
          }

          else if(
            !countryCities[property].cities.filter((c: City) => c.name === city.name).length
          ) {
            countryCities[property].cities.push(city)
          }
        }
        
        return Object.values(countryCities);
      }),
      tap(console.log),
      takeUntil(this.unsubscribe$)
    );

    this.weather$ = this.getWeather$.pipe(
      switchMap((id) => this.weatherService.getWeatherByLocationId(id)),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectionChange(cityId: number) {
    this.getWeather$.next(cityId);
  }
}
