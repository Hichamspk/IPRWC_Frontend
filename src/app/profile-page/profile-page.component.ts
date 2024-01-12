import { Component, OnInit } from '@angular/core';
import { User } from "../model/profile-page.model";
import { ProfilePageService } from "../service/profile-page.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import {ShopOrder} from "../model/shop-order.model";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User | any = [];
  orders: ShopOrder[] = [];

  constructor(private profilePageService: ProfilePageService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser(): void {
    this.profilePageService.getUserById().subscribe(
        (response: User) => {
          this.user = response;
          this.getUserOrders();
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
          alert(error.message);
        }
    );
  }

  private getUserOrders(): void {
    if (this.user && this.user.email) {
      this.profilePageService.getUserOrders(this.user.email).subscribe(
          response => {
            if (response.code === 'OK') {
              console.log('Fetched orders:', response.payload);
              this.orders = response.payload;
            } else {
              console.error('Error response code:', response.code);
            }
          },
          error => {
            console.error('Error fetching user orders:', error);
          }
      );
    } else {
      console.log('User email not found');
    }
  }





  navigateToAdminPanel(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.user = null;

    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
}
