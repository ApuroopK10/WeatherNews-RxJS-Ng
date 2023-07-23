import { Component } from '@angular/core';
import { ForecastService, WeatherData } from '../forecast.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent {
  forecast$!: Observable<
    {
      dateString: string;
      temp: number;
    }[]
  >;
  constructor(private forecaseSer: ForecastService) {}

  ngOnInit() {
    this.forecast$ = this.forecaseSer.getForecastData();
  }
}
