import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
    // Voeg andere componenten die je hebt gemaakt hier toe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    // Voeg andere Angular modules die je gebruikt hier toe
  ],
  providers: [],
  bootstrap: [AppComponent] // Zorg ervoor dat AppComponent hier staat
})
export class AppModule { }

