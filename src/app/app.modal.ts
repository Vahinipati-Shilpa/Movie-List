export class AppModal {
  movieData: any;
  searchTitle: any;
  searchYear: any;
  searchPlot: any;
  pager: any;
  allItems: any;
  pagedItems: any;
  isDataFetched: boolean;
  constructor() {
      this.searchPlot = '';
      this.searchTitle = '';
      this.searchYear = '';
      this.movieData = [];
      this.isDataFetched = false;
      this.pagedItems = [];
  }
}
