import { Component } from '@angular/core';
// import { TokenService } from './token.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MindSData';
  constructor(private token:DataService){
    this.token.getToken();
  }
}
