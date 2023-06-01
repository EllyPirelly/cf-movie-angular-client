import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // injects the HttpClient module to the constructor params
  // provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    // apiUrl + 'users' is similar to React's apiUrl/${users}
    // this.http - posts to the API endpoint and returns the API response
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // // get all movies
  // getAllMovies(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
  //     {
  //       Authorization: 'Bearer ' + token,
  //     })}).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  // // non-typed response extraction
  // private extractResponseData(res: Response): any {
  //   const body = res;
  //   return body || {};
  // }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
