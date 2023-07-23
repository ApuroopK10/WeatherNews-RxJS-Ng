import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

export interface WeatherData {
  list: {
    main: {
      temp: number;
    };
    dt_txt: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(
    private http: HttpClient,
    private notifSer: NotificationsService
  ) {}

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notifSer.addSuccess('Got ur location');
      }),
      catchError((err) => {
        this.notifSer.addError('failed to get location');
        return throwError(() => new Error(err));
      })
    );
  }

  getForecastData() {
    return this.getCurrentLocation().pipe(
      map((data) => {
        return new HttpParams()
          .set('lat', String(data.latitude))
          .set('lon', String(data.longitude))
          .set('units', 'metric')
          .set('appid', '4e6633dac84a511c40c5ed6d86b0c6e5');
      }),
      switchMap((params) => this.http.get<WeatherData>(this.url, { params })),
      map((data: WeatherData) => data.list),
      mergeMap((value) => of(...value)),
      filter((value1, idx) => idx % 8 === 0),
      map((values) => {
        return {
          dateString: values.dt_txt,
          temp: values.main.temp,
        };
      }),
      toArray(),
      share()
    );
  }
}
