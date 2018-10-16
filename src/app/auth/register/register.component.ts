import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegistrationData } from '../models/registration-data';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Just a way to access the template variable from HTML
  // @ViewChild('registerForm') registerForm: ElementRef;
  
  private formData = {};
  private errorMessages = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  register(form) {
    this.authService.register(<RegistrationData>this.formData)
      .subscribe(
      (response) => {
        console.log(response);
        form.reset();
      },
      (errorResponse) => {
        //TODO: add logging service
        this.errorMessages = errorResponse.error.errors;
      });
  }
}