import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API URL for data
const apiUrl = 'https://mooviv.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constractors params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
    // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
    // Makin the API call for LogIn
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'user', {headers: new HttpHeaders(
      {
        Authorization: `Bearer` + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making API to get All Movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API to get one movie by Title
  getOneMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + ':Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // API to get director by Name
    getDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies' + 'director' + ':Name', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

      // API to get genre by Name
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + 'Genres' + ':Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // API to get user by Name
  getUser(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users' + ':Username', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API update users info
  updateUsersInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users' + ':Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API DELETE user from system 
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + ':Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API to ADD a movi to favorites

  addMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users' + ':Username' + 'Movies' + ':MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API to DELETE a movie from favorites
  deleteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + ':Username' + 'Favorites' + ':MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


    // Non-type response etraction

    private extractResponseData(res: Response): any {
      const body = res;
      return body || { };
    }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Statuse code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something happened; please try again later.');
  }
}

