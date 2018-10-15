import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Just a way to access the template variable from HTML
  // @ViewChild('registerForm') registerForm: ElementRef;
  
  private formData = {};

  constructor() { }

  ngOnInit() {
  }

  register = function(form) {
    // TODO: Send data to the server

    // console.log(this.formData);
    // console.log(form);
    form.reset();
  }

}
