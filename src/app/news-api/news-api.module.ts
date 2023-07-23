import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaArticleListComponent } from './na-article-list/na-article-list.component';
import { NaArtileListPipe } from './na-artile-list.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NaArticleListComponent, NaArtileListPipe],
  imports: [CommonModule, SharedModule],
  exports: [NaArticleListComponent, NaArtileListPipe],
})
export class NewsApiModule {}
