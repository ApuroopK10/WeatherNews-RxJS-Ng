import { Component } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css'],
})
export class NaArticleListComponent {
  articles!: Article[];
  noOfPages!: number;
  constructor(private newsApiSer: NewsApiService) {
    this.newsApiSer.noOfPages.subscribe(
      (pageCount) => (this.noOfPages = pageCount)
    );
    this.newsApiSer.pagesOutput.subscribe((pages: Article[]) => {
      this.articles = pages;
    });
    this.newsApiSer.getPage(1);
  }

  handlePageClick(pageNo: number) {
    this.newsApiSer.getPage(pageNo);
  }
}
