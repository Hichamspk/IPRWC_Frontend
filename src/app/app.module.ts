import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './product/product.component';
import {NavbarComponent} from "./navbar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {RegisterComponent} from "./register/register.component";



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    ProfilePageComponent,
    AdminPanelComponent,
    RegisterComponent,
  LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

