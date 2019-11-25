import { Component, OnInit } from '@angular/core';
import { AppModal } from './app.modal';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Movie';
  appModalData: AppModal = new AppModal();
  constructor(private appService: AppService) {}
  search () {
    if(String(this.appModalData.searchTitle).length < 3) {
      window.alert('Please enter atleast 3 characters in title');      
    } else {
      this.appService.getMovieData(this.appModalData);
    }
  }
  ngOnInit() {
  }

  reset() {
    this.appModalData.searchTitle = null;
    this.appModalData.searchPlot = null;
    this.appModalData.searchYear = null;
  }
}
