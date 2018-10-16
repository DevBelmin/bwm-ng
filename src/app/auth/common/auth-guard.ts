import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RouterStateSnapshot, Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router:Router) { }

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        return this.authService.isLoggedIn().map(e => {
            if (e) {
                return true;
            }
        }).catch(() => {
            this.router.navigate(['/login']);
            return Observable.of(false);
        });
    }   
}