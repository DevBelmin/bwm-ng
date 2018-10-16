import { AuthService } from './common/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { bwmAPIInterceptor } from './common/api-interceptor';

const authRoutes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { 
        path: 'login', 
        component: LoginComponent,
      },
      { 
        path: 'register', 
        component: RegisterComponent 
      },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: bwmAPIInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }