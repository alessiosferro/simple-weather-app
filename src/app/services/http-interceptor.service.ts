import { WeatherAPI } from "../data/weather-api-paths";

import { environment } from "../../environments/environment";
import { HttpRequest, HttpHandler } from "@angular/common/http";

export class HttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.headers.has("Weather-Request")) {
      const requestWithAppId = request.clone({
        url: `${environment.BASE_URL}/${request.headers.get(
          "Weather-Request"
        )}`,
        params: request.params.append("APPID", environment.APPID).append("units", "metric"),
        headers: request.headers.delete("Weather-Request")
      });

      return next.handle(requestWithAppId);
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

    return next.handle(request);
  }
}
