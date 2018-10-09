import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header/header.component';
import { RentalComponent } from './rental/rental.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app-router/app-router.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RentalComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
