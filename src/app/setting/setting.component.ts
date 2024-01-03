import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class SettingComponent implements OnInit {

 
  users: any[] = [];

  constructor(private DataService: DataService) {}

  ngOnInit() {
    this.DataService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
