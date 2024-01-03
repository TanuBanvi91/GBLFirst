// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, retry, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   code: string;

//   apiURL = 'https://gateway.eu1.mindsphere.io/api/technicaltokenmanager/v3';
//   // node_apiURL ='http://test-excellent-lizard-pz.apps.eu1.mindsphere.io/api/'
//   token:string = '';
//   constructor(private http: HttpClient, private httpClient: HttpClient) {
//     var id = 'indishms-demoapi-v1.0.0';
//     var secret = 'flH6auqN1TAczf1uQwexvtZHJXG6SCVbqXswdk4j1Nt';
//     this.code = btoa(id + ':' + secret)
//     console.log(this.code)
//    }


//   async getToken(){

//     const body = {
//       "grant_type": "client_credentials",
//       "appName": "demoapi",
//       "appVersion":"v1.0.0",
//       "hostTenant":"indishms",
//       "userTenant":"indishms"
//     };
//     let auth = JSON.stringify(body);
//     await this.authToken_api(auth);
//     return this.token;
//   }




//   async authToken_api(authdata: any) {
//     let  httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-SPACE-AUTH-KEY': `bearer ${this.code}`
//       })
//     }
//     return await this.http.post<any>(this.apiURL + '/oauth/token', authdata, httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       ).subscribe(data => {
//         sessionStorage.setItem("token",data.access_token);
//         this.token = data.access_token;
//         console.log(data.access_token)});
//   }


//   handleError(error: any) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = error.error.message;
//     } else {
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     //window.alert(errorMessage);
//     console.log(errorMessage);
//     return throwError(errorMessage);
//   }
// }
