import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationData } from '../models/registration-data';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(data: RegistrationData) : Observable<any> {

    let headers = new HttpHeaders();
    headers.set("Content-Type", "appliation/json");

    return this.http.post(`${environment.baseApi}/api/v1/auth/register`, data, {headers: headers})
      .pipe(map((res: Response) => {

        // TODO: transform the response to apropriate format...
        return res;
        
      //   if (res.status === 201 || res.status === 200) {
      //     return [{status: res.status, data: res}];
      //   }

      // })).catch((err: any) => {
      //   //TODO: Add logging 
      //   console.log(err);
      //   return Observable.throw(new Error(err.status));
      }))
  }
}
