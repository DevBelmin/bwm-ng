import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { TOKEN_NAME } from './auth.service';

@Injectable()
export class bwmAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(TOKEN_NAME);
    
    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
      
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}