import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationData } from '../models/registration-data';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { LoginData } from '../models/login-data';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from "rxjs";

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: any): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  register(data: RegistrationData): Observable<any> {

    return this.http.post(`${environment.baseApi}/api/v1/auth/register`, data, { headers: this.headers })
      .pipe(map((res: Response) => {
        return res;
      }))
  }

  login(data: LoginData) {

    return this.http.post(`${environment.baseApi}/api/v1/auth/`, data, { headers: this.headers })
      .pipe(map((token) => {
        if (token) {
          this.setToken(token);
          this.isLoginSubject.next(true);
        }
        return token;
      }));
  }
  
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.isLoginSubject.next(false);
  }

  private hasToken() : boolean {
    return localStorage.getItem(TOKEN_NAME) && !this.isTokenExpired();
  }
}