import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  api_key = '8acbf1ed71f449449afca7a8a1b79ab5';

  constructor(private http: HttpClient) {}

  initSources() {
    return this.http.get(
      'https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key
    );
  }
  getArticlesByID(source: string) {
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?sources=' +
        source +
        '&apiKey=' +
        this.api_key
    );
  }
  initArticles() {
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='
    );
  }
}
