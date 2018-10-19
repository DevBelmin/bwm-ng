import { AuthService } from './../../../auth/common/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : Observable<boolean>;

  constructor(public authService: AuthService, private router: Router) { 
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  navigate() {
    if (this.isLoggedIn) {
      this.authService.logout();
    }
    this.router.navigate(['/login']);
  }
}
