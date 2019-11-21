import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { AppModal } from '../app.modal';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  static readonly pageSize = 3;
  public pageNumber = 0;
  public moviePreviewList = [];
  public movieListSize = 0;
  public paginationArr = [];
  appModalData: AppModal = new AppModal();
  constructor(private appService: AppService) { }
  subscribeToData() {
    this.appService.onMovieData().subscribe(data => {
      if (data != null) {
        this.appModalData.movieData = isNullOrUndefined(data.Search) ? [] : data.Search;
        this.appModalData.movieData.forEach(element => {
          if (isNullOrUndefined(element.Poster) || String(element.Poster) === 'N/A') {
            element.Poster = 'assets/no-image.jpg';
          }
        });
        console.log(this.appModalData.movieData);
        this.movieListSize = this.appModalData.movieData.length;
        this.setMovieList();
        this.setPaginationArray();
      }
    });
  }
  ngOnInit() {
    this.subscribeToData();
  }

  public setMovieList() {
    this.moviePreviewList = this.appModalData.movieData.slice(this.pageNumber, this.pageNumber + SearchResultComponent.pageSize);
  }
  public setPaginationArray() {
    const len = Math.ceil(this.movieListSize / SearchResultComponent.pageSize);
    this.paginationArr = Array.from(Array(len).keys()).map(i => i + 1);
  }

  public next() {
    if (this.pageNumber < this.movieListSize - this.getDefaultPageSize()) {
      this.pageNumber += SearchResultComponent.pageSize;
      this.setMovieList();
    }

  }

  public previous() {
    if (this.pageNumber > 0) {
      this.pageNumber -= SearchResultComponent.pageSize;
      this.setMovieList();
    }

  }

  public getDefaultPageSize() {
    return SearchResultComponent.pageSize;
  }

  public getCurrenPage(page: number): boolean {
    return this.pageNumber === (page - 1) * this.getDefaultPageSize();
  }

  public setPage(page: number) {
    this.pageNumber = (page - 1) * this.getDefaultPageSize();
    this.setMovieList();
  }

}
