import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegistrationData } from '../models/registration-data';
import { Router } from '@angular/router';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Just a way to access the template variable from HTML
  // @ViewChild('registerForm') registerForm: ElementRef;
  
  public formData : RegistrationData;
  public errorMessages = [];

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new RegistrationData('','','','');
   }

  ngOnInit() {

  }

  register(form) {
    this.authService.register(this.formData)
      .subscribe(
      (response) => {
        form.reset();
        this.router.navigate(['/login', {registered: 'success'}]);
      },
      (errorResponse) => {
        //TODO: add logging service
        this.errorMessages = errorResponse.error.errors;
      });
  }
}