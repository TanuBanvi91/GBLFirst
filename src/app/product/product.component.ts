import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  constructor(private DataService: DataService) { }

  ngOnInit(): void {
  }

 
  getData(){

  this.DataService.getUsers().subscribe(
    data => {
      console.log('Data from the database:', data);
      
    },
    error => {
      console.error('Error fetching data from the database', error);
    }
  );
  }
}
