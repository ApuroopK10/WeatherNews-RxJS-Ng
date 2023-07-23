import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

export interface Article {
  title: string;
  url: string;
  source: {
    name: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '0cbae4ac367447db9af127295295ef53';
  private country = 'in';
  private pagesInput: Subject<number> = new Subject();
  pagesOutput: Observable<Article[]>;
  noOfPages: Subject<number> = new Subject();
  constructor(private http: HttpClient) {
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', this.pageSize)
          .set('page', page);
      }),
      switchMap((params: HttpParams) =>
        this.http.get<NewsApiResponse>(this.url, { params })
      ),
      tap((response) =>
        this.noOfPages.next(Math.ceil(response.totalResults / this.pageSize))
      ),
      map((data) => data.articles)
    );
  }

  getPage(pageNo: number) {
    this.pagesInput.next(pageNo);
  }
}
