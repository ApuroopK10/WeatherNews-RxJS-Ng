import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  currentPage = 1;
  @Input('noOfPages') noOfPages = 5;
  @Output('pageClicked') pageClicked = new EventEmitter<number>();
  pageOptions!: number[];

  constructor() {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter((pageNo) => pageNo >= 1 && pageNo <= this.noOfPages);
  }

  onPagination(page: number) {
    this.currentPage = page;
    this.pageClicked.emit(page);
  }
}
