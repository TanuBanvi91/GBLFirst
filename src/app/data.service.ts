import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  code: string;
  token: any;

  constructor(private http: HttpClient, private httpClient: HttpClient, private cookieService: CookieService, private xsrfToken: HttpXsrfTokenExtractor) { 
    var id = 'indishms-demoapi-v1.0.0';
    var secret = 'flH6auqN1TAczf1uQwexvtZHJXG6SCVbqXswdk4j1Nt';
    this.code = btoa(id + ':' + secret)
    console.log(this.code)
   
     }

 
   apiURL = 'https://gateway.eu1.mindsphere.io/api/technicaltokenmanager/v3';


   async getToken(){

    const body = {
      "grant_type": "client_credentials",
      "appName": "demoapi",
      "appVersion":"v1.0.0",
      "hostTenant":"indishms",
      "userTenant":"indishms"
    };
    let auth = JSON.stringify(body);
    await this.authToken_api(auth);
    return this.token;
  }

  async authToken_api(authdata: any) {
    let  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-SPACE-AUTH-KEY': `bearer ${this.code}`
      })
    }
    return await this.http.post<any>(this.apiURL + '/oauth/token', authdata, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      ).subscribe(data => {
        sessionStorage.setItem("token",data.access_token);
        this.token = data.access_token;
      });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
 
// get the data from the pg database  

  private pgUrl = 'http://localhost:5038/api/data';

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.pgUrl);
  }


  
  private apiUrl = 'https://gateway.eu1.mindsphere.io/api/assetmanagement/v3/assets';

  fetchAsset():Observable<any>{
   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.apiUrl, { headers });
    console.log(this.token)

    }

  // private apiUrl2 = 'https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/496bba119c364b9d8abd1f58e0489a3b/Pump?from=2023-12-02T12:05:30.207Z&to=2023-12-12T12:05:30.207Z&limit=10&select=Flow&sort=asc&latestValue=false';

  private apiUrl2 = 'https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/d7de2dae10d14dbe8a1f7f36c001997d/GBL_SAMPLE_ASPECT?from=2023-12-02T12:05:30.207Z&to=2023-12-12T12:05:30.207Z&limit=10&select=EFFICIENCY&sort=asc&latestValue=false';
  
  fetchVariable(token:string):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.apiUrl2, {headers});
  }

  //===============  Aggregate   ========================

  
  // private apiUrl4 = 'https://gateway.eu1.mindsphere.io/api/iottsaggregates/v4/aggregates?assetId=d7de2dae10d14dbe8a1f7f36c001997d&aspectName=GBL_SAMPLE_ASPECT&from=2023-12-02T12:05:30.207Z&to=2023-12-12T12:05:30.207Z&intervalUnit=hour&intervalValue=4&select=EFFICIENCY';
  
  fetchAggregate(newFromDate:string, newToDate:string):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const apiUrl4 = `https://gateway.eu1.mindsphere.io/api/iottsaggregates/v4/aggregates?assetId=d7de2dae10d14dbe8a1f7f36c001997d&aspectName=GBL_SAMPLE_ASPECT&from=${newFromDate}&to=${newToDate}&intervalUnit=hour&intervalValue=4&select=EFFICIENCY&limit=200`;
    return this.http.get(apiUrl4, {headers});
  }

  //========   Zoom    ======

  zoomChart(intervalUnit:string, intervalValue:number, startTime:number, endTime:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const apiUrl4 = `https://gateway.eu1.mindsphere.io/api/iottsaggregates/v4/aggregates?assetId=d7de2dae10d14dbe8a1f7f36c001997d&aspectName=GBL_SAMPLE_ASPECT&from=${startTime}&to=${endTime}&intervalUnit=${intervalUnit}&intervalValue=${intervalValue}&select=EFFICIENCY`;
    return this.http.get(apiUrl4, {headers});
  }

  // private apiUrl3 = 'https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/496bba119c364b9d8abd1f58e0489a3b/Pump?from=2023-12-02T12:05:30.207Z&to=2023-12-12T12:05:30.207Z&limit=10&select=Motor_Current&sort=asc&latestValue=false';

  
  private apiUrl3 = 'https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/d7de2dae10d14dbe8a1f7f36c001997d/GBL_SAMPLE_ASPECT?from=2023-12-02T12:05:30.207Z&to=2023-12-12T12:05:30.207Z&limit=10&select=INPUT_FLOW&sort=asc&latestValue=false';
  

  fetchInputflow():Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.apiUrl3, {headers});
  }


  
}

