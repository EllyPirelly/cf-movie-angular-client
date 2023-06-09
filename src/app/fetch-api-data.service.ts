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

  /**
  * user registration for new users
  * @service POST request to '/users'
  * @param userDetails
  * @returns an object holding user data
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * user login for existing users
  * @service POST request to '/login'
  * @param userDetails
  * @returns an object holding user data
  */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * add a favorite movie to user's favorite movies by movieid
  * @service POST request to '/users/{userName}/movies/{movieid}'
  * @param movieid
  * @returns an object holding user's favorite movies including newly added movie(s)
  */
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

  /**
  * get all movies
  * @service GET request to '/movies'
  * @returns an object holding all movies data
  */
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

  /**
  * get a specific user by userName
  * @service GET request to '/users/{userName}'
  * @returns an object holding data of a specific user
  */
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

  /**
  * get favorite movies by userName
  * @service GET request to '/users/{userName}'
  * @returns an object holding user's favorite movies
  */
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

  /**
  * get a specific movie by title
  * @service GET request to '/movies/{title}'
  * @param title
  * @returns an object holding data of a specific movie
  */
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

  /**
  * get a specific movie genre by genreName
  * @service GET request to '/movies/genres/{genreName}'
  * @param genreName
  * @returns an object holding data of a specific movie genre
  */
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

  /**
  * get a specific director by directorName
  * @service GET request to '/movies/directors/{directorName}'
  * @param directorName
  * @returns an object holding data of a specific director
  */
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

  /**
  * edit / update user by useName
  * @service PUT request to '/users/{userName}'
  * @param updatedUser
  * @returns an object holding updated data of a specific user
  */
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

  /**
  * delete a user by userName
  * @service DELETE request to '/users/{userName}'
  * @returns a message and redirects to welcome page
  */
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

  /**
  * delete a favorite movie off of user's favorite movies by movieid
  * @service DELETE request to '/users/{userName}/movies/{movieid}'
  * @param movieid
  * @returns an object holding data of user's favorite movies
  */
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
