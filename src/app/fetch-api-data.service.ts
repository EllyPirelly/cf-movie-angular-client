import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// please see API:
// https://github.com/EllyPirelly/cf-movie-api/blob/main/index.js
// https://github.com/EllyPirelly/cf-movie-api/blob/main/auth.js

const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // injects the HttpClient module to the constructor params
  // provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // post a user / registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // post user / log in
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // post movie via movieid to user's favorites list
  addFavoriteMovie(movieId: string): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get all users
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a specific user by userName
  getUser(): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get favorite movies for a user
  // dunno what to make of this as we do not have a dedicated endpoint to display only favorite movies, so this needs to be the general user by userName?
  getFavoriteMovies(): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // get a specific movie by title
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a specific movie genre by genreName
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a specific director by directorName
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // update/put user by userName
  editUser(updatedUser: any): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.put(apiUrl + 'users/' + userName, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete user by userName
  deleteUser(): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete movie via movieid off of user's favorites list
  deleteMovie(movieId: string): Observable<any> {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

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
