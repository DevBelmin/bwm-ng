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

class DecodedToken {
  exp: number = 0;
  username: string ;
  userId: string;
}

@Injectable()
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken(TOKEN_NAME));

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private decodedToken;

  constructor(private http: HttpClient) { 

    let token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    else {
      this.decodedToken = new DecodedToken();
    }
  }

  getToken(token: string): string {
    return localStorage.getItem(token);
  }

  setToken(token: any): void {
    localStorage.setItem(TOKEN_NAME, token);
    this.decodedToken = jwt_decode(token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken(TOKEN_NAME);
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
    this.decodedToken = new DecodedToken();
    this.isLoginSubject.next(false);
  }

  getUsername(): string {
    return this.decodedToken.username;
  }

  private hasToken(token: string) : boolean {
    return localStorage.getItem(token) && !this.isTokenExpired();
  }
}