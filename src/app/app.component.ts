import { StaticDataService } from "./services/static-data.service";
import { City } from "./models/city.interface";
import { WeatherService } from "./services/weather.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
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
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { WeatherAPIResponse } from "./models/weather-api-response.interface";
import { EventEmitter } from 'protractor';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;
  unsubscribe$: Subject<void>;
  city$: Observable<WeatherAPIResponse>;
  submitted$ = new Subject();

  constructor(
    private weatherService: WeatherService,
    private staticDataService: StaticDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      city: ["", [Validators.required, Validators.minLength(3)]]
    });

    this.unsubscribe$ = new Subject<void>();

    this.city$ = this.submitted$.pipe(
      filter(() => this.form.valid),
      switchMap(city => this.staticDataService.getCitiesByName(this.form.value.city)),
      map(cities =>
        cities
          .filter(city => city.country === "IT")
          .slice(1, 10)
          .map(city => city.id)
          .shift()
      ),
      filter(id => !!id),
      switchMap(locationId =>
        this.weatherService.getWeatherByLocationId(locationId)
      ),
      tap(console.log),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
