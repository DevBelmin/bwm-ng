import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public errorMessages = [];
  public showRegistrationMessage: boolean;

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.showRegistrationMessage = true;
      }
    })

    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

    onSubmit() {

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      const { email, password} = this.loginForm.value;

      this.authService.login({email, password})
        .subscribe((res: any) => {

          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/rentals']);
          }
        }, 
        (errorResponse) => {
          this.errorMessages = errorResponse.error.errors;
        });
  }
}
