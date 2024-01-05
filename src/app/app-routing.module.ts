import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {NavbarComponent} from "./navbar/navbar.component";

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  {path: 'navbar', component: NavbarComponent}
  // Andere routes hier...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
