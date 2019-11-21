import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppModal } from './app.modal';
import { AppUtil } from './app.util';


@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) { }
  private movieData;
  private movieData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  async getMovieData(appModalData: AppModal) {
    let params: HttpParams = new HttpParams();
    params = params.set('s', appModalData.searchTitle.trim());
    params = params.set('y', appModalData.searchYear.trim());
    params = params.set('p', appModalData.searchPlot.trim());
    const data = await this.http.get<{ data: any }>(AppUtil.getUrl(), { params: params }).toPromise();
    this.setMovieData(data);
  }
  setMovieData(data) {
    this.movieData = data;
    this.movieData$.next(this.movieData);
  }
  onMovieData() {
    return this.movieData$.asObservable();
  }
}
