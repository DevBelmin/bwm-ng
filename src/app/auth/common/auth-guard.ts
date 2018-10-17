import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RouterStateSnapshot, Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router:Router) { }

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        return this.authService.isLoggedIn().map(loggedIn => {
           
            if (loggedIn) {

                if (state.url !== '/rentals') {
                    this.router.navigate(['/rentals']);
                }
                return true;
            }
            else {
                if (state.url === '/register' || state.url === '/login' ) { return true;}
                else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
        });
    }   
}