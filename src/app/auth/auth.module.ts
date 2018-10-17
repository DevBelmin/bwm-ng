import { AuthService } from './common/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/token.interceptor';
import { AuthGuard } from './common/auth-guard';

const authRoutes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [AuthGuard]
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
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }