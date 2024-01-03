import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { HttpHeaders } from '@angular/common/http';
// import { TokenService } from '../token.service';
import { HttpClient,HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  

  token:string='';
  // assetList = [];
  assetNames = [];

  constructor(private DataService: DataService,private http: HttpClient, private httpClient: HttpClient, private cookieService: CookieService, private xsrfToken: HttpXsrfTokenExtractor) { }

  fetchToken(): void{
    
  }

  fetchData(): void{

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.DataService.fetchAsset().subscribe(
      data=>{
        const assetList = data._embedded.assets;
        this.assetNames = assetList.map((asset: { name: string }) => asset.name);

        console.log(this.assetNames);
      },
      error =>{
        console.error(error);
      }
    )
  }


  // fetchData(): void {
  //   this.DataService.fetchAsset1().subscribe(
  //     data => {
  //       const assetList = data._embedded.assets;
  //       this.assetNames = assetList.map((asset: { name: string }) => asset.name);
  //       console.log(this.assetNames);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }



  ngOnInit(): void {

      }

}
