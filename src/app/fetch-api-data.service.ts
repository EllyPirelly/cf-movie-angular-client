import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// please see API:
// https://github.com/EllyPirelly/cf-movie-api/blob/main/index.js
// https://github.com/EllyPirelly/cf-movie-api/blob/main/auth.js

const apiUrl = 'https://movie-pool.onrender.com/';
const token = localStorage.getItem('token');
const userName = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // injects the HttpClient module to the constructor params
  // provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // post a user / sign up
  // '/users'
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // post user / log in
  // '/login'
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // post movie via movieid to user's favorites list
  // '/users/:userName/movies/:movieid'
  addFavoriteMovie(movieid: string): Observable<any> {
    return this.http
      .post(apiUrl + 'users/' + userName + '/movies/' + movieid,
        {
          favoriteMovies: movieid
        },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get all users - we don't need that endpoint
  // '/users'
  getAllUsers(): Observable<any> {
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get all movies
  // '/movies'
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get a specific user by userName
  // '/users/:userName'
  getUser(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get favorite movies for a user
  // we do not have this as an API endpoint....??? so we are using the one for userName???
  getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.favoriteMovies),
        catchError(this.handleError)
      );
  }

  isFavoriteMovie(movieid: string): boolean {
    const user = JSON.parse(localStorage.getItem('userName') || '{}');
    return user.favoriteMovies.indexOf(movieid) >= 0;
  }

  // get a specific movie by title
  // '/movies/:title'
  getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get a specific movie genre by genreName
  // '/movies/genres/:genreName'
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // get a specific director by directorName
  // '/movies/directors/:directorName'
  getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // update/put user by userName
  // '/users/:userName'
  updateUser(updatedUser: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userName, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // delete user by userName
  // '/users/:userName'
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // delete movie via movieid off of user's favorites list
  // '/users/:userName/movies/:movieid'
  deleteMovie(movieid: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieid, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // non-typed response extraction
  private extractResponseData(res: any): any {
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
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
