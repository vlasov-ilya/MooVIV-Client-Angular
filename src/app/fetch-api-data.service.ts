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
  constructor(private http: HttpClient) { }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
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
// Makin the API call for LogIn
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
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
@Injectable({
  providedIn: 'root'
})
export class GetAllMovies {
  constructor(private http: HttpClient) { }
  // Making API to get All Movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  // Non-typed response extraction

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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

export class GetOneMovie {
  constructor(private http: HttpClient) { }
  // API to get one movie by Title
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies' + ':Title', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
export class GetDirector {
  constructor(private http: HttpClient) { }
  // API to get director by Name
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + 'director' + ':Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
export class GetGener {
  constructor(private http: HttpClient) { }
  // API to get genre by Name
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + 'genres' + ':title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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

export class GetUser {
  constructor(private http: HttpClient) { }
  // API to get user by Name
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users' + ':username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
export class UpdateUsersInfo {
  constructor(private http: HttpClient) { }
  // API update users info
  updateUsersInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users' + ':username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
export class DeleteUser {
  constructor(private http: HttpClient) { }
  // API DELETE user from system
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + ':username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
export class AddMovie {
  constructor(private http: HttpClient) { }
  // API to ADD a movi to favorites

  addMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users' + ':username' + 'movies' + ':movieid', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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

export class DeleteMovie {
  constructor(private http: HttpClient) { }
  // API to DELETE a movie from favorites
  deleteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + ':username' + 'favorites' + 'movieid', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
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
