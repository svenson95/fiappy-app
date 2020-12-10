import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User, AuthUser, RegisterUser } from '../../models/user';
import { AuthResponse } from '../../models/auth-response';

const AUTH_STORAGE_KEY = 'fia_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `${environment.baseUrl}/user/login`;
  private registerUrl = `${environment.baseUrl}/user/register`;
  private logoutUrl = `${environment.baseUrl}/user/logout`;
  private authenticatedUrl = `${environment.baseUrl}/user/authenticated`;

  // private clientId = 'id';
  // private clientSecret = 'secret';
  private token = 'jwt';

  public data: any | undefined;
  public user: User;
  public isAuthenticated = false;
  public redirectUrl: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar
  ) {}

  login(user: AuthUser): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.httpClient.post<AuthResponse>(this.loginUrl, JSON.stringify(user), httpOptions)
      .pipe(
        map(response => {
          this.data = response;
          this.user = response.user;
          this.token = response.token;
          this.isAuthenticated = true;
          this.storeToken();
          return response;
        })
      );
  }

  register(user: RegisterUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.httpClient.post<any>(this.registerUrl, JSON.stringify(user), httpOptions)
      .pipe(
        map(authResponseData => {
          this.data = authResponseData;
          this.user = authResponseData.user;
          this.token = authResponseData.token;
          this.isAuthenticated = true;
          this.storeToken();
          return authResponseData;
        })
      );
  }

  invalidate(): Observable<any> {
    const httpOptions = {
      withCredentials: true
    };
    this.isAuthenticated = false;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return this.httpClient.get<any>(this.logoutUrl, httpOptions)
      .pipe(
        map(response => {
          this.data = null;
          this.user = null;
          this.token = null;
          this.isAuthenticated = false;
          return response;
        })
      );
  }

  authenticated(): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.httpClient.get<any>(this.authenticatedUrl, httpOptions)
      .pipe(
        map(authResponseData => {
          this.data = authResponseData;
          this.user = authResponseData.user;
          this.isAuthenticated = true;
          if (authResponseData.token) {
            this.token = authResponseData.token;
            this.storeToken();
          }
          return authResponseData;
        })
      );
  }

  storeToken(): void {
    localStorage.setItem(AUTH_STORAGE_KEY, this.token);
    console.log('token stored');
  }
}
