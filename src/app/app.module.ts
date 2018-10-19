import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/common/auth-guard';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRouterModule } from './app-router/app-router.module';
import { AuthErrorHandler } from './auth-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    RentalModule,
    AuthModule,
    FormsModule
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: AuthErrorHandler
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
