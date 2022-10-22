import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from './services/news.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'first_app';
  public sources: any = [];
  public articles: any=[];
  selectedNewsChannel: string = 'Top 10 Trending News!';

  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res: any) => {
      this.articles = res.articles;
    });

    this.newsApi.initSources().subscribe((res: any) => {
      this.sources = res.sources;
    });
  }
  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsApi: NewsService
  ) {}

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  searchSource(source: any) {
    this.newsApi.getArticlesByID(source.id).subscribe((res: any) => {
      this.selectedNewsChannel = source.name;
      this.articles = res.articles;
    });
  }
}
