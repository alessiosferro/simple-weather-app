import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";
import { WeatherAPI } from "../data/weather-api-paths";
import { tap } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  hideSpinner = () =>
    tap(event => {
      if (event instanceof HttpResponse) {
        this.loadingService.hide();
      }
    });

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if(!request.headers.has("Static-Data-Request"))
      this.loadingService.show();

    if (request.headers.has("Weather-Request")) {
      const requestWithAppId = request.clone({
        url: `${environment.BASE_URL}/${request.headers.get(
          "Weather-Request"
        )}`,
        params: request.params
          .append("APPID", environment.APPID)
          .append("units", "metric"),
        headers: request.headers.delete("Weather-Request")
      });

      return next.handle(requestWithAppId).pipe(this.hideSpinner());
    }

    if (request.headers.has("Static-Data-Request")) {
      const staticDataRequest = request.clone({
        url: `${environment.STATIC_DB_URL}/${request.headers.get(
          "Static-Data-Request"
        )}`,
        headers: request.headers.delete("Static-Data-Request")
      });

      return next.handle(staticDataRequest);
    }

    return next.handle(request).pipe(this.hideSpinner());
  }
}
