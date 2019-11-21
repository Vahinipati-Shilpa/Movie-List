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
    this.appService.getMovieData(this.appModalData);
  }
  ngOnInit() {
  }
}
