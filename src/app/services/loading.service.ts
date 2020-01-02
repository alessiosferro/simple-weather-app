import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  show() {
    this._loading$.next(true)
  }

  hide() {
    this._loading$.next(false);
  }

  get loading$() { return this._loading$.asObservable(); }
}